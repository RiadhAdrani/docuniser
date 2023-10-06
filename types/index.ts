export enum Events {
  getDocument = 'get:document',
  getDocumentChildren = 'get:document-children',
  getDocuments = 'get:documents',
  createDocument = 'post:document',
  deleteDocument = 'delete:document',
  updateDocument = 'patch:document',
  duplicateDocument = 'post:duplicate-document',
}

export enum Priority {
  low = 'Low',
  medium = 'Medium',
  high = 'High',
  urgent = 'Urgent',
}

export interface Base {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document extends Base {
  title: string;
  priority: Priority;
  shortDescription?: string;
  parent?: string;
}

export type CreateDocumentBody = Pick<Document, 'title' | 'priority' | 'parent'>;

export type UpdateDocumentBody = Pick<Document, 'id'> &
  Partial<Pick<Document, 'title' | 'priority' | 'shortDescription'>>;

export interface StoreResponse<T = unknown> {
  data: T;
  message?: string;
  error?: string;
}
