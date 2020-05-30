import { omniFunc } from './osa';
import { OFJSTask, OFJSTag } from '../model/omnijs/ofjs';
import { Task } from '../model/Task';
import taskMapper from '../transform/taskMapper';
import tagMapper from '../transform/tagMapper';

interface TaskCreateOptions {
  projectId: string;
  note: string;
}

function allItemsFilter() {
  return true;
}

export const getTasks = omniFunc(
  function(
    [mapperMethod, defaultFilter],
    filter?: (item: OFJSTask) => boolean
  ) {
    return this.flattenedTasks
      .filter(filter || defaultFilter)
      .map(item => mapperMethod(item));
  },
  [taskMapper, allItemsFilter]
);

export const getProjects = omniFunc(
  function(
    [mapperMethod, defaultFilter],
    filter?: (item: OFJSTask) => boolean
  ) {
    return this.flattenedProjects
      .filter(filter || defaultFilter)
      .map(mapperMethod);
  },
  [taskMapper, allItemsFilter]
);

export const getTags = omniFunc(
  function([mapperMethod, defaultFilter], filter?: (item: OFJSTag) => boolean) {
    return this.flattenedTags
      .filter(filter || defaultFilter)
      .map(item => mapperMethod(item));
  },
  [tagMapper, allItemsFilter]
);

export const getTasksForPerspective = omniFunc(
  function([mapperMethod], perspectiveName: string) {
    const perspective = this.Perspective.all.find(
      item => item.name === perspectiveName
    );
    this.document.windows[0].perspective = perspective;
    return this.document.windows[0].content
      .nodesForObjects(this.flattenedTasks)
      .map(item => item.object)
      .map(mapperMethod) as Task[];
  },
  [taskMapper]
);

export const createTask = omniFunc(
  function(
    [mapperMethod],
    title: string,
    options: Partial<TaskCreateOptions> = {}
  ) {
    const project = options.projectId
      ? this.Project.byIdentifier(options.projectId)
      : undefined;
    const task = new this.Task(title, project);
    if (options.note) {
      task.note = options.note;
    }
    return mapperMethod(task);
  },
  [taskMapper]
);

export const deleteTaskById = omniFunc(function([], id: string) {
  const task = this.Task.fromIdentifier(id);
  this.deleteObject(task);
}, []);
