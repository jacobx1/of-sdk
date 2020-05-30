import { OFJSTask } from '../model/omnijs/ofjs';
import { Task } from '../model/Task';

export default function taskMapper({
  name,
  completed,
  id,
  completionDate,
  dropDate,
  added,
  modified,
  deferDate,
  dueDate,
  estimatedMinutes,
  note,
  tags,
  project,
}: OFJSTask): Task {
  return {
    name,
    completed,
    dropDate: dropDate && dropDate.toISOString(),
    added: added && added.toISOString(),
    modified: modified && modified.toISOString(),
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
  };
}
