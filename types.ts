export enum Priority {
  low = 'Low',
  medium = 'Medium',
  high = 'High',
  urgent = 'Urgent',
}

export interface Base {
  id: string;
}

export interface Document extends Base {
  title: string;
  priority: Priority;
}
