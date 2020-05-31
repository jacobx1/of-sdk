import DatabaseDocument from './DatabaseDocument';
import Folder from './Folder';
import Project from './Project';
import Tag from './Tag';
import Task from './Task';
import DocumentWindow from './DocumentWindow';
import DatabaseObject from './DatabaseObject';

export default interface Selection {
  readonly allObjects: DatabaseObject[];
  readonly document: DatabaseDocument;
  readonly folders: Folder[];
  readonly projects: Project[];
  readonly tags: Tag[];
  readonly tasks: Task[];
  readonly windoe: DocumentWindow | null;
}
