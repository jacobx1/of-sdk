import {
  getTasks,
  getProjects,
  getTags,
  getTasksForPerspective,
  createTask,
  deleteTaskById,
} from '../../osa/omnijs';

describe('omnijs', () => {
  describe('read tests', () => {
    it('gets all open tasks', async () => {
      const allTasks = await getTasks(item => !item.completed);
      expect(allTasks).toBeTruthy();
    }, 60000);

    it('get projects', async () => {
      const allProjects = await getProjects();
      expect(allProjects).toBeTruthy();
    });

    it('gets tags', async () => {
      const allTags = await getTags();
      expect(allTags).toBeTruthy();
    });

    it('gets tasks from perspective', async () => {
      const allTasks = await getTasksForPerspective('Today');
      expect(allTasks).toBeTruthy();
    });
  });

  describe('write tests', () => {
    const newTaskIds: string[] = [];
    it('creates a task', async () => {
      const task = await createTask('Hello world');
      expect(task).toBeTruthy();
      newTaskIds.push(task.id);
    });

    it('creates task in project', async () => {
      const projects = await getProjects(item => item.name === 'GitHub');
      const project = projects[0];
      const task = await createTask('Hello github', {
        projectId: project.id,
        note: 'WOOOO',
      });
      expect(task).toBeTruthy();
      newTaskIds.push(task.id);
    });

    afterAll(async () => {
      for (const id of newTaskIds) {
        await deleteTaskById(id);
      }
    });
  });
});
