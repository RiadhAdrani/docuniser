export enum Events {
  getDocument = 'get:document',
  getDocumentChildren = 'get:document-children',
  getDocuments = 'get:documents',
  createDocument = 'post:document',
  deleteDocument = 'delete:document',
  updateDocument = 'patch:document',

  addDocumentCheckList = 'post:document:checklist',
  updateDocumentCheckList = 'patch:document:checklist',
  deleteDocumentCheckList = 'delete:document:checklist',

  duplicateDocument = 'post:duplicate-document',
  getPreference = 'get:preference',
  updatePreference = 'update:preference',
  fetchFilesData = 'post:files-data',
  openFile = 'chore:open-file',
}

export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
  urgent = 'urgent',
}

export interface Base {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckListItem extends Base {
  text: string;
  doneAt?: Date;
}

export interface Document extends Base {
  title: string;
  priority: Priority;
  shortDescription?: string;
  parent?: string;
  files: Array<string>;
  checklist: Array<CheckListItem>;
}

export type CreateDocumentBody = Pick<Document, 'title' | 'priority' | 'parent'>;

export type UpdateDocumentBody = Pick<Document, 'id'> &
  Partial<Pick<Document, 'title' | 'priority' | 'shortDescription' | 'files'>>;

export interface StoreResponse<T = unknown> {
  data: T;
  message?: string;
  error?: string;
}

export type UpdatePreferenceBody = Partial<Preference>;

export type CardType = 'normal' | 'compact' | 'list';

export type Language = 'fr' | 'en';

export type Theme = 'light' | 'dark';

export type Preference = {
  cardType: CardType;
  lang: Language;
  theme: Theme;
};

export type FileData = {
  path: string;
  name: string;
  type?: string;
};

export type CreateCheckListBody = {
  documentId: string;
  item: Pick<CheckListItem, 'text'>;
};

export type UpdateCheckListBody = {
  documentId: string;
  item: Pick<CheckListItem, 'id'> & Partial<Pick<CheckListItem, 'doneAt' | 'text'>>;
};

export type DeleteCheckListBody = {
  documentId: string;
  itemId: string;
};
