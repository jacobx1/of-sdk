import { omniFunc } from './osa';
import { Task as OFJSTask, Tag as OFJSTag, Project } from '@jacobx1/of-types';
import { Task } from '../model/Task';
import taskMapper from '../transform/taskMapper';
import tagMapper from '../transform/tagMapper';
import projectMapper from '../transform/projectMapper';

interface TaskCreateOptions {
  projectId: string;
  note: string;
}

function allItemsFilter() {
  return true;
}

export const getTasks = omniFunc(
  function (deps, filter?: (item: OFJSTask) => boolean) {
    return this.flattenedTasks
      .filter(filter || deps.defaultFilter)
      .map((item) => deps.taskMapper(item));
  },
  {
    taskMapper,
    defaultFilter: allItemsFilter,
  }
);

export const getProjects = omniFunc(
  function (deps, filter?: (item: Project) => boolean) {
    return this.flattenedProjects
      .filter(filter || deps.defaultFilter)
      .map(deps.projectMapper);
  },
  {
    projectMapper: projectMapper,
    defaultFilter: allItemsFilter,
  }
);

export const getTags = omniFunc(
  function (
    [mapperMethod, defaultFilter],
    filter?: (item: OFJSTag) => boolean
  ) {
    return this.flattenedTags
      .filter(filter || defaultFilter)
      .map((item) => mapperMethod(item));
  },
  [tagMapper, allItemsFilter]
);

export const getTasksForPerspective = omniFunc(
  function (deps, perspectiveName: string) {
    const perspective = this.Perspective.all.find(
      (item) => item.name === perspectiveName
    );
    this.document.windows[0].perspective = perspective;
    return this.document.windows[0].content
      .nodesForObjects(this.flattenedTasks)
      .map((item) => item.object)
      .map(deps.taskMapper) as Task[];
  },
  {
    taskMapper,
  }
);

export const createTask = omniFunc(
  function (deps, title: string, options: Partial<TaskCreateOptions> = {}) {
    const project = options.projectId
      ? this.Project.byIdentifier(options.projectId)
      : undefined;
    const task = new this.Task(title, project);
    if (options.note) {
      task.note = options.note;
    }
    return deps.taskMapper(task);
  },
  {
    taskMapper,
  }
);

export const deleteTaskById = omniFunc(function (deps, id: string) {
  const task = this.Task.byIdentifier(id);
  this.deleteObject(task);
}, {});
