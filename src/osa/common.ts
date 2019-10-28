import osa2 from 'osa2';
import { OFActionItem } from '../model/OFActionItem';
import { OFDocumentWindow } from '../model/jxa/OFDocumentWindow';
import { OFProject } from '../model/OFProject';
import { OFTag } from '../model/OFTag';
import { OFTask } from '../model/OFTask';
import { OFTree } from '../model/OFTree';

declare const Application: any;

enum CallType {
  ALL_PROJECTS,
  ALL_TAGS,
  ALL_TASKS,
  TASKS_FOR_PERSPECTIVE,

  ADD_PROJECT,
  ADD_TAG,
  ADD_TAGS,
  ADD_TASK,
}

function commonCall<TReturn = void>(
  callType: CallType,
  ...callerArgs: any[]
): Promise<TReturn> {
  return osa2<TReturn>((type, callTypes, ...args) => {
    const omnifocus = Application('Omnifocus');

    const getDefaultWindow = () =>
      omnifocus.defaultDocument.documentWindows[0] as OFDocumentWindow;

    const getProjectById = (projectId: string) => {
      if (projectId) {
        return omnifocus.defaultDocument.flattenedProjects.whose({
          id: projectId,
        })[0];
      }
      return null;
    };

    const getTaskById = (taskId: string) =>
      omnifocus.defaultDocument.flattenedTasks.whose({
        id: taskId,
      })[0];

    const getData = item => ({
      name: item.name(),
      id: item.id(),
    });

    const getExtenedTagData = (item): OFTag => ({
      ...getData(item),
      availableTaskCount: item.availableTaskCount(),
      effectivelyHidden: item.effectivelyHidden(),
      hidden: item.hidden(),
      remainingTaskCount: item.remainingTaskCount(),
    });

    const getExtendedActionItemData = (item): OFActionItem => ({
      ...getData(item),
      flagged: item.flagged(),
      completionDate: item.completionDate(),
      completed: item.completed(),
      dropped: item.dropped(),
      creationDate: item.creationDate(),
      modificationDate: item.modificationDate(),
      deferDate: item.deferDate(),
      dueDate: item.dueDate(),
      estimatedMinutes: item.estimatedMinutes(),
      note: item.note.text(),
    });

    const getExtendedTaskData = (item): OFTask => ({
      ...getExtendedActionItemData(item),
      tags: item.tags().map(getExtenedTagData),
    });

    const getExtendedProjectData = (item): OFProject => ({
      ...getExtendedActionItemData(item),
      status: item.status(),
      effectiveStatus: item.effectiveStatus(),
      numberOfTasks: item.numberOfTasks(),
    });

    function tasksForPerspective(perspectiveName: string) {
      const window = getDefaultWindow();
      window.perspectiveName.set(perspectiveName);

      const parseContent = (content): OFTree[] => {
        if (!content.trees) {
          return [{ ...getData(content), children: [] }];
        }

        return content
          .trees()
          .map(item => ({ ...getData(item), children: parseContent(item) }));
      };
      return parseContent(window.content);
    }

    const allCallTypes: typeof CallType = callTypes;

    switch (type) {
      case allCallTypes.TASKS_FOR_PERSPECTIVE:
        return tasksForPerspective(args[0]);
      case allCallTypes.ALL_PROJECTS:
        return omnifocus.defaultDocument.flattenedProjects
          .whose(args[0])()
          .map(getExtendedProjectData);
      case allCallTypes.ALL_TASKS:
        const project = getProjectById(args[1]);
        return (project
          ? project.rootTask
          : omnifocus.defaultDocument
        ).flattenedTasks
          .whose(args[0])()
          .map(getExtendedTaskData);
      case allCallTypes.ALL_TAGS:
        return omnifocus.defaultDocument.flattenedTags
          .whose(args[0])()
          .map(getExtenedTagData);
      case allCallTypes.ADD_TASK: {
        const [taskDefinition, projectId] = args;
        const newTask = omnifocus.Task(taskDefinition);
        const project = getProjectById(projectId);
        if (project) {
          project.rootTask.tasks.push(newTask);
        } else {
          omnifocus.defaultDocument.inboxTasks.push(newTask);
        }
        return getExtendedTaskData(newTask);
      }
      case allCallTypes.ADD_PROJECT: {
        const newProject = omnifocus.Project(args[0]);
        omnifocus.defaultDocument.projects.push(newProject);
        return getExtendedProjectData(newProject);
      }
      case allCallTypes.ADD_TAGS: {
        const task = getTaskById(args[0]);
        for (const tagId of args[1]) {
          const tag = omnifocus.defaultDocument.flattenedTags.whose({
            id: tagId,
          })[0];
          omnifocus.add(task, { to: tag.tasks });
        }
        return getExtendedTaskData(getTaskById(args[0]));
      }
      case allCallTypes.ADD_TAG: {
        const tag = omnifocus.Tag(args[0]);
        omnifocus.defaultDocument.tags.push(tag);
        return getExtenedTagData(tag);
      }
    }
  })(callType, CallType, ...callerArgs);
}

export const getTasksForPerspective = (perspectiveName: string) =>
  commonCall<OFTree[]>(CallType.TASKS_FOR_PERSPECTIVE, perspectiveName);

export const getProjects = (
  searchCriteria: Partial<OFProject> = {
    completed: false,
    dropped: false,
  }
) => commonCall<OFProject[]>(CallType.ALL_PROJECTS, searchCriteria);

export const getTasks = (
  searchCriteria: Partial<OFTask> = {
    completed: false,
    dropped: false,
  },
  projectId?: string
) => commonCall<OFTask[]>(CallType.ALL_TASKS, searchCriteria, projectId);

export const getTags = (
  searchCriteria: Partial<OFTag> = {
    effectivelyHidden: false,
  }
) => commonCall<OFTag[]>(CallType.ALL_TAGS, searchCriteria);

export const addTask = (newTask: Partial<OFTask>, projectId?: string) =>
  commonCall<OFTask>(CallType.ADD_TASK, newTask, projectId);

export const addProject = (newProject: Partial<OFProject>) =>
  commonCall<OFProject>(CallType.ADD_PROJECT, newProject);

export const addTags = (itemId: string, tagIds: string[]) =>
  commonCall<OFTask>(CallType.ADD_TAGS, itemId, tagIds);

export const addTag = (newTag: Partial<OFTag>) =>
  commonCall<OFTag>(CallType.ADD_TAG, newTag);
