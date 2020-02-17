import {
  getProjects,
  getTasks,
  getTasksForPerspective,
  getTasksAsActionItems,
} from '../../osa/experimental';

describe('experimental', () => {
  describe('read tests', () => {
    it('gets tasks for today perspective', async () => {
      const todayTasks = await getTasksForPerspective('Today');
      expect(todayTasks).toBeTruthy();
    });

    it('gets all tasks', async () => {
      const allTasks = await getTasks();
      expect(allTasks).toBeTruthy();
    }, 60000);

    it('gets all projects', async () => {
      const allProjects = await getProjects();
      expect(allProjects).toBeTruthy();
    });

    describe('faster', () => {
      it('gets all tasks', async () => {
        const allTasks = await getTasksAsActionItems();
        expect(allTasks).toBeTruthy();
      });
    });
  });
});
