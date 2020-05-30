import { OFJSTask, OFJSTag } from './ofjs';

export default interface OmnifocusContext {
  Application: any;
  flattenedProjects: any;
  Perspective: any;
  Task: any;
  Project: any;
  document: any;
  flattenedTasks: OFJSTask[];
  flattenedTags: OFJSTag[];
  deleteObject: (object: any) => void;
}
