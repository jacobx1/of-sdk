import { runScript } from './scriptrunner';
import { OFTask } from '../model/OFTask';
import { OFActionItem } from '../model/OFActionItem';

export const getTasksForPerspective = (perspectiveName: string) =>
  runScript<OFActionItem>('tasks_for_perspective.scpt', perspectiveName);

export enum BatchFilterType {
  ALL = 'all',
  REMAINING = 'remaining',
  CLOSED = 'closed',
  DROPPED = 'dropped',
  COMPLETED = 'completed',
}

enum BatchQueryType {
  TASKS = 'tasks',
  PROJECTS = 'projects',
}

export const getProjects = (
  filter: BatchFilterType = BatchFilterType.REMAINING,
  folderId?: string
) =>
  runScript<OFTask[]>(
    'all_tasks.scpt',
    BatchQueryType.PROJECTS,
    filter,
    'true',
    folderId
  );

export const getTasks = (
  filter: BatchFilterType = BatchFilterType.REMAINING,
  projectId?: string
) =>
  runScript<OFTask[]>(
    'all_tasks.scpt',
    BatchQueryType.TASKS,
    filter,
    'true',
    projectId
  );

export const getTasksAsActionItems = (
  filter: BatchFilterType = BatchFilterType.REMAINING,
  projectId?: string
) =>
  runScript<OFActionItem[]>(
    'all_tasks.scpt',
    BatchQueryType.TASKS,
    filter,
    'false',
    projectId
  );
