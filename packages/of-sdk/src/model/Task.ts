export interface Task {
  name: string;
  completed: boolean;
  id: string;
  completionDate: string;
  dropDate: string;
  added: string;
  modified: string;
  deferDate: string;
  dueDate: string;
  estimatedMinutes: number;
  note: string;
  project: {
    name: string;
    id: string;
  };
  tags: {
    name: string;
    id: string;
  }[];
}
