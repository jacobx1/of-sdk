import {
  getProjects,
  getTags,
  getTasks,
  getTasksForPerspective,
} from '../../osa/common';

describe('common', () => {
  describe('read tests', () => {
    it('gets tasks for today perspective', async () => {
      const todayTasks = await getTasksForPerspective('Today');
      expect(todayTasks).toBeTruthy();
    });

    it('gets all tasks', async () => {
      const allTasks = await getTasks();
      expect(allTasks).toBeTruthy();
    }, 20000);

    it('gets all projects', async () => {
      const allProjects = await getProjects();
      expect(allProjects).toBeTruthy();
    });

    it('gets all tags', async () => {
      const allTags = await getTags();
      expect(allTags).toBeTruthy();
    });
  });
});
