import Tag from './Tag';
import ActiveObject from './ActiveObject';
import Project from './Project';

export default interface Task extends ActiveObject {
  markComplete(date?: Date): void;
  markIncomplete(): void;

  name: string;
  completed: boolean;
  completionDate: Date;
  dropDate: Date;
  added: Date;
  modified: Date;
  deferDate: Date;
  dueDate: Date;
  estimatedMinutes: number;
  note: string;
  project: Task;
  tags: Tag[];
}

export interface TaskStatic {
  new (name: string, position: Project | Task | null): Task;
  byIdentifier: (id: string) => Task;
}
