import { OFJSTask, OFJSTag, OFJSObject } from './ofjs';

export default interface OmnifocusContext {
  Application: any;
  flattenedProjects: OFJSObject[];
  Perspective: any;
  Task: any;
  Project: any;
  document: any;
  flattenedTasks: OFJSTask[];
  flattenedTags: OFJSTag[];
  deleteObject: (object: any) => void;
}
