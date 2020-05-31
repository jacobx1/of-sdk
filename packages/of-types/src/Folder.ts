import ActiveObject from './ActiveObject';
import Project from './Project';

// TODO: Incomplete
export default interface Folder extends ActiveObject {
  folderNamed(name: string): Folder | null;
  projectNamed(name: string): Project | null;
  sectionNamed(name: string): Project | Folder | null;
  childNamed(name: string): Project | Folder | null;
  apply(fn: (item: Folder | Project) => void): any | null;

  name: string;
}

export interface FolderStatic {
  new (name: string, position: Folder | null): Folder;
  byIdentifier(id: string): Folder;
}
