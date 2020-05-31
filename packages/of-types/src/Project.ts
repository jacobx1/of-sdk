import DatabaseObject from './DatabaseObject';
import Task from './Task';
import URL from './URL';
import Tag from './Tag';
import FileWrapper from './FileWrapper';
import Folder from './Folder';
import TaskStatus from './TaskStatus';
import ProjectStatus from './ProjectStatus';

export default interface Project extends DatabaseObject {
  taskNamed: (name: string) => Task | null;
  addAttachment: (attachment: FileWrapper) => void;
  removeAttachmentAtIndex: (index: number) => void;
  markComplete: (date?: Date) => Task;
  markIncomplete: () => void;
  addNotification: (info: number | Date) => any;
  removeNotification: (notification: any) => void;
  addTag: (tag: Tag) => void;
  addTags: (tags: Tag[]) => void;
  removeTag: (tag: Tag) => void;
  removeTags: (tags: Tag[]) => void;
  clearTags: () => void;
  addLinkedFileURL: (url: URL) => void;
  removeLinkedFileWithURL: (url: URL) => void;

  after: any;
  attachments: FileWrapper[];
  before: any;
  beginning: any;
  children: Task[];
  completed: boolean;
  completedByChildren: boolean;
  completionDate: Date | null;
  containsSingletonActions: boolean;
  defaultSingletonActionHolder: boolean;
  deferDate: Date | null;
  dropDate: Date | null;
  dueDate: Date | null;
  readonly effectiveCompletedDate: Date | null;
  readonly effectiveDeferDate: Date | null;
  readonly effectiveDropDate: Date | null;
  readonly effectiveDueDate: Date | null;
  readonly effectiveFlagged: boolean;
  ending: any;
  estimatedMinutes: number | null;
  flagged: boolean;
  readonly flattenedChildren: Task[];
  readonly flattenedTasks: Task[];
  readonly hasChildren: boolean;
  lastReviewDate: Date | null;
  readonly linkedFileUrls: URL[];
  name: string;
  nextReviewDate: Date | null;
  readonly nextTask: Task | null;
  note: string;
  notifications: any[];
  repetitionRule: any;
  sequential: boolean;
  shouldUseFloatingTimeZone: boolean;
  status: ProjectStatus;
  tags: Tag[];

  // root task
  readonly task: Task;
  readonly taskStatus: TaskStatus;
  readonly tasks: Task[];
}

export interface ProjectStatic {
  new (name: string, position: Folder | null): Project;
  byIdentifier: (id: string) => Project | null;
}
