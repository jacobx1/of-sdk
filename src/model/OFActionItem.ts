import { OFItem } from './OFItem';

export interface OFActionItem extends OFItem {
  deferDate?: string;
  completionDate?: string;
  note: string;
  flagged: boolean;
  creationDate: string;
  modificationDate: string;
  dueDate?: string;
  estimatedMinutes?: number;
  completed: boolean;
  dropped: boolean;
  parent?: OFItem;
}
