export interface Project {
  name: string;
  completed: boolean;
  id: string;
  completionDate: string;
  dropDate: string;
  deferDate: string;
  dueDate: string;
  estimatedMinutes: number;
  note: string;
  tags: {
    name: string;
    id: string;
  }[];
}
