import Task, { TaskStatic } from './Task';
import DatabaseObject from './DatabaseObject';
import Tag from './Tag';
import { ApplicationStatic } from './Application';
import Project, { ProjectStatic } from './Project';
import DatabaseDocument from './DatabaseDocument';

export interface OmnifocusScriptingContext {
  Application: ApplicationStatic;
  flattenedProjects: Project[];
  Perspective: any;
  Task: TaskStatic;
  Project: ProjectStatic;
  document: DatabaseDocument;
  flattenedTasks: Task[];
  flattenedTags: Tag[];
  deleteObject: (object: DatabaseObject) => void;
}

export { Task, DatabaseObject as Object, Tag, Project };
