export interface OFJSId {
  primaryKey: string;
}

export interface OFJSObject {
  id: OFJSId;
  name: string;
}

export interface OFJSTag extends OFJSObject {
  active: boolean;
}

export interface OFJSTask extends OFJSObject {
  completed: boolean;
  completionDate: Date;
  dropDate: Date;
  added: Date;
  modified: Date;
  deferDate: Date;
  dueDate: Date;
  estimatedMinutes: number;
  note: string;
  project: OFJSTask;
  tags: OFJSTag[];
}
