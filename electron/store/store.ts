import ElectronStore from 'electron-store';
import { Events, CreateDocumentBody, Document, UpdateDocumentBody } from '../../types/index';
//@ts-ignore
import { random } from '@riadh-adrani/math-utils';
import { hasProperty, omit, pick } from '@riadh-adrani/obj-utils';
import { log, on } from './utils';
import { validation } from './validation';

const store = new ElectronStore<{ documents: Record<string, Document> }>({
  schema: {
    documents: {
      type: 'object',
    },
  },
});

const checkAndMigrate = () => {
  // ? documents
  // add createdAt and updatedAt

  let updated = false;

  const docs = store.get('documents');

  Object.keys(docs).forEach((key) => {
    const parent = docs[key].parent;

    // check for parent
    if (parent && !docs[parent]) {
      // delete parentless document
      updated = true;

      delete docs[parent];
    }

    if (!hasProperty(docs[key], 'createdAt')) {
      docs[key].createdAt = new Date();

      updated = true;
    }

    if (!hasProperty(docs[key], 'updatedAt')) {
      docs[key].updatedAt = new Date();

      updated = true;
    }
  });

  if (updated) {
    log('[Migration] migrating documents...');
    store.set('documents', docs);
    log('[Migration] document migrated successfully');
  }
};

const init = () => {
  const docs = store.get('documents');

  if (!docs) {
    log('empty store, creating new record...');
    store.set('documents', {});
    log('new record created.');
  }

  checkAndMigrate();
};

export const createId = (): string => {
  return `${random(0, 1000)}-${random(0, 1000)}-${Date.now()}`;
};

const start = () => {
  on<CreateDocumentBody, Document>(Events.createDocument, (body) => {
    const id = createId();

    const validBody = validation.createDocument.validateSync(body);

    const document: Document = {
      ...validBody,
      createdAt: new Date(),
      updatedAt: new Date(),
      id,
    };

    const docs = store.get('documents');

    docs[id] = document;

    store.set(`documents`, docs);

    return document;
  });

  on<string, Document>(Events.getDocument, (id) => {
    const docs = store.get('documents');

    const doc = docs[id];

    if (!doc) {
      throw 'Document not found';
    }

    return doc;
  });

  on<unknown, Array<Document>>(Events.getDocuments, () => {
    const docs = store.get('documents');

    const data = Object.keys(docs)
      .filter((it) => !docs[it].parent)
      .map((it) => docs[it]);

    return data;
  });

  on<string, { msg: string }>(Events.deleteDocument, (id) => {
    const docs = store.get('documents');

    const doc = docs[id];

    if (!doc) {
      throw 'Document not found';
    }

    delete docs[id];

    store.set('documents', docs);

    const children: Array<string> = [];

    // TODO: delete children recursively
    const deleteChildren = (id: string) => {
      Object.keys(docs).forEach((key) => {
        if (docs[key].parent !== id) return;

        children.push(key);

        deleteChildren(key);
      });
    };

    children.forEach((key) => delete docs[key]);

    log(`deleted (${children.length}) sub children`);

    return { msg: 'Document deleted successfully' };
  });

  on<UpdateDocumentBody, Document>(Events.updateDocument, (body) => {
    const validBody = validation.updateDocument.validateSync(body);

    const { id } = validBody;

    const docs = store.get('documents');

    let doc = docs[id];

    if (!doc) {
      throw 'Document not found';
    }

    doc = { ...doc, ...validBody, updatedAt: new Date() };

    docs[id] = doc;

    store.set('documents', docs);

    return doc;
  });

  on<string, Array<Document>>(Events.getDocumentChildren, (id) => {
    const docs = store.get('documents');

    const children = Object.keys(docs)
      .filter((it) => docs[it].parent === id)
      .map((it) => docs[it]);

    return children;
  });

  on<string>(Events.duplicateDocument, (id) => {
    const docs = store.get('documents');

    const target = docs[id];

    if (!target) {
      throw 'Document not found';
    }

    const duplicate = (target: Document, parent?: string) => {
      const id = createId();

      const dup: Document = { ...omit(target, 'id'), parent, id, title: `${target.title} - dup` };

      docs[id] = dup;

      // search for all children and duplicate them
      Object.keys(docs).forEach((key) => {
        if (docs[key].parent !== target.id) return;

        duplicate(docs[key], id);
      });
    };

    duplicate(target, target.parent);

    store.set('documents', docs);
  });
};

init();
start();
