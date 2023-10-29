import ElectronStore from 'electron-store';
import {
  Events,
  CreateDocumentBody,
  Document,
  UpdateDocumentBody,
  Preference,
  UpdatePreferenceBody,
  FileData,
  CreateCheckListBody,
  CheckListItem,
  UpdateCheckListBody,
  DeleteCheckListBody,
  AddFileBody,
} from '../../types/index';
//@ts-ignore
import { random } from '@riadh-adrani/math-utils';
import { hasProperty, isArray, omit } from '@riadh-adrani/obj-utils';
import { log, on, createBase } from './utils';
import { validation } from './validation';

import { basename } from 'path';
import openExplorer from 'open-file-explorer';

type Store = {
  documents: Record<string, Document>;
  preference: Preference;
};

const store = new ElectronStore<Store>({
  schema: {
    documents: {
      type: 'object',
    },
    preference: {
      type: 'object',
      properties: {
        cardType: { type: 'string', default: 'normal' },
        lang: { type: 'string', default: 'en' },
        theme: { type: 'string', default: 'light' },
      },
    },
  },
});

const checkAndMigrate = () => {
  // ? documents
  // add createdAt and updatedAt

  let docUpdated = false;

  const docs = store.get('documents');

  Object.keys(docs).forEach((key) => {
    const parent = docs[key].parent;

    // check for parent
    if (parent && !docs[parent]) {
      // delete parentless document
      docUpdated = true;

      delete docs[parent];
    }

    if (!hasProperty(docs[key], 'createdAt')) {
      docs[key].createdAt = new Date();

      docUpdated = true;
    }

    if (!hasProperty(docs[key], 'updatedAt')) {
      docs[key].updatedAt = new Date();

      docUpdated = true;
    }

    if (!isArray(docs[key]['files'])) {
      docs[key].files = [];
      docUpdated = true;
    }

    if (!isArray(docs[key]['checklist'])) {
      docs[key].checklist = [];
      docUpdated = true;
    }
  });

  if (docUpdated) {
    log('[Migration] migrating documents...');
    store.set('documents', docs);
    log('[Migration] document migrated successfully');
  }

  // ? preferences
  const preference = store.get('preference');

  if (!preference) {
    const defaultPref: Store['preference'] = { cardType: 'normal', lang: 'en', theme: 'light' };

    log('[Migration] migrating preference...');
    store.set('preference', defaultPref);
    log('[Migration] preference migrated successfully');
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

const start = async () => {
  on<CreateDocumentBody, Document>(Events.createDocument, (body) => {
    const id = createId();

    const validBody = validation.createDocument.validateSync(body);

    const document: Document = {
      ...validBody,
      createdAt: new Date(),
      updatedAt: new Date(),
      id,
      files: [],
      checklist: [],
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

  on<undefined, Preference>(Events.getPreference, () => {
    const data = store.get('preference');

    return data;
  });

  on<UpdatePreferenceBody, Preference>(Events.updatePreference, (body) => {
    const validated = validation.updatePreference.validateSync(body);

    let data = store.get('preference');

    data = { ...data, ...validated };

    store.set('preference', data);

    return data;
  });

  on<Array<string>, Promise<Array<FileData>>>(Events.fetchFilesData, async (files) => {
    const data: Array<FileData> = [];

    for (const path of files) {
      const name = basename(path);

      const segments = name.split('.');

      const type = segments.length > 1 ? segments.at(-1) : 'unknown';

      const fileData: FileData = { name, path, type };

      data.push(fileData);
    }

    return data;
  });

  on<string>(Events.openFile, async (path) => {
    return new Promise((res, rej) => {
      openExplorer(path, (err) => {
        if (err) {
          rej(err);
          return;
        }

        res('success');
      });
    });
  });

  on<CreateCheckListBody, Promise<Document>>(Events.addCheckList, async (body) => {
    const { documentId, item } = await validation.createCheckListBody.validate(body);

    const documents = store.get('documents');

    if (!documents[documentId]) {
      throw 'Document not found';
    }

    const { text } = item;

    const checkItem: CheckListItem = { ...createBase(), text };

    documents[documentId].checklist.push(checkItem);

    store.set('documents', documents);

    return documents[documentId];
  });

  on<UpdateCheckListBody, Promise<Document>>(Events.updateCheckList, async (body) => {
    const { documentId, item } = await validation.updateCheckListBody.validate(body);

    const documents = store.get('documents');

    if (!documents[documentId]) {
      throw 'Document not found';
    }

    documents[documentId].checklist = documents[documentId].checklist.map((it) => {
      if (it.id === item.id) {
        if (item.doneAt) {
          it.doneAt = new Date();
        } else if (item.doneAt === false) {
          it.doneAt = undefined;
        }

        if (item.text) {
          it.text = item.text;
        }
      }

      return it;
    });

    store.set('documents', documents);

    return documents[documentId];
  });

  on<DeleteCheckListBody, Promise<Document>>(Events.deleteCheckList, async (body) => {
    const { documentId, itemId } = await validation.deleteCheckListBody.validate(body);

    const documents = store.get('documents');

    if (!documents[documentId]) {
      throw 'Document not found';
    }

    documents[documentId].checklist = documents[documentId].checklist.filter(
      (it) => it.id !== itemId
    );

    store.set('documents', documents);

    return documents[documentId];
  });

  on<AddFileBody, Promise<Document>>(Events.addFile, async (body) => {
    const { documentId, path } = await validation.addFile.validate(body);

    const documents = store.get('documents');

    if (!documents[documentId]) {
      throw 'Document not found';
    }

    // check if file exists
    const found = documents[documentId].files.includes(path);

    if (found) {
      throw 'File already exists';
    }

    documents[documentId].files.push(path);

    store.set('documents', documents);

    return documents[documentId];
  });

  on<AddFileBody, Promise<Document>>(Events.deleteFile, async (body) => {
    const { documentId, path } = await validation.addFile.validate(body);

    const documents = store.get('documents');

    if (!documents[documentId]) {
      throw 'Document not found';
    }

    // check if file exists
    const found = documents[documentId].files.includes(path);

    if (!found) {
      throw 'File does not exist';
    }

    documents[documentId].files = documents[documentId].files.filter((file) => file !== path);

    store.set('documents', documents);

    return documents[documentId];
  });
};

init();
start();
