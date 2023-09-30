import ElectronStore from 'electron-store';
import { useWin } from '../main/index';
import { ipcMain } from 'electron';
import {
  Events,
  CreateDocumentBody,
  Document,
  StoreResponse,
  UpdateDocumentBody,
} from '../../types/index';
//@ts-ignore
import { random } from '@riadh-adrani/math-utils';
import { hasProperty } from '@riadh-adrani/obj-utils';

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

const log = (msg: string) => {
  console.log(`[STORE]: ${msg}`);
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

type EventCallback<B = unknown, R = unknown> = (body: B) => R;

const on: <B = unknown, R = unknown>(event: Events, callback: EventCallback<B, R>) => void = (
  event,
  callback
) => {
  ipcMain.on(event, (_, body) => {
    log(`received event "${event}"`);

    let response: StoreResponse = { data: undefined };

    try {
      const data = callback(body);

      response.data = data as unknown;
      log(`processed event "${event}" successfully`);
    } catch (error) {
      log(`error processing event "${event}"`);
      log(`body = ${body}`);

      response.error = `${error}`;
    }

    useWin()?.webContents.send(event, response);
  });
};

const start = () => {
  on<CreateDocumentBody, Document>(Events.createDocument, (body) => {
    const id = createId();

    // TODO: validation

    const document: Document = {
      ...body,
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

    const data = Object.keys(docs).map((it) => docs[it]);

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

    return { msg: 'Document deleted successfully' };
  });

  on<UpdateDocumentBody, Document>(Events.updateDocument, (body) => {
    // TODO: verify body

    const { id } = body;

    const docs = store.get('documents');

    let doc = docs[id];

    if (!doc) {
      throw 'Document not found';
    }

    doc = { ...doc, ...body, updatedAt: new Date() };

    docs[id] = doc;

    store.set('documents', docs);

    return doc;
  });
};

init();
start();
