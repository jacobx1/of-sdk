import { osa } from './osa';

declare const Application: any;
declare const flattenedTasks: any;

interface OFJSId {
  primaryKey: string;
}

interface OFJSTask {
  name: string;
  completed: boolean;
  id: OFJSId;
  completionDate: Date;
  dropped: Date;
  added: Date;
  modified: Date;
  deferDate: Date;
  dueDate: Date;
  estimatedMinutes: number;
  note: string;
  project: {
    name: string;
    id: OFJSId;
  };
  tags: any[];
}

const execOmniJs = osa<string>(scpt => {
  const omnifocus = Application('Omnifocus');
  return omnifocus.evaluateJavascript(scpt);
});

const exec = async scpt => {
  const data = await execOmniJs(scpt);
  return JSON.parse(data);
};

const taskMapper = ({
  name,
  completed,
  id,
  completionDate,
  dropped,
  added,
  modified,
  deferDate,
  dueDate,
  estimatedMinutes,
  note,
  tags,
  project,
}) => ({
  name,
  completed,
  dropped,
  added: added.toISOString(),
  modified: modified.toISOString(),
  deferDate: deferDate && deferDate.toISOString(),
  dueDate: dueDate && dueDate.toISOString(),
  estimatedMinutes,
  note,
  id: id.primaryKey,
  completionDate: completionDate && completionDate.toISOString(),
  tags: tags.map(tag => ({
    name: tag.name,
    id: tag.id.primaryKey,
  })),
  project: project && {
    name: project.name,
    id: project.id.primaryKey,
  },
});

const getTasksScript = (filter = (item: OFJSTask) => true) => {
  function scpt(filterMethod, mapperMethod) {
    return flattenedTasks.filter(filterMethod).map(mapperMethod);
  }
  return `${scpt.toString()}; JSON.stringify(scpt(${filter.toString()}, ${taskMapper}));`;
};

export const getTasks = (filter?: (item: OFJSTask) => boolean) =>
  exec(getTasksScript(filter));
