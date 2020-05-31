import { Project as OFJSProject } from '@jacobx1/of-types';
import { Project } from '../model/Project';

export default function projectMapper({
  name,
  completed,
  id,
  completionDate,
  dropDate,
  deferDate,
  dueDate,
  estimatedMinutes,
  note,
  tags,
}: OFJSProject): Project {
  return {
    name,
    completed,
    dropDate: dropDate && dropDate.toISOString(),
    deferDate: deferDate && deferDate.toISOString(),
    dueDate: dueDate && dueDate.toISOString(),
    estimatedMinutes,
    note,
    id: id.primaryKey,
    completionDate: completionDate && completionDate.toISOString(),
    tags: tags.map((tag) => ({
      name: tag.name,
      id: tag.id.primaryKey,
    })),
  };
}
