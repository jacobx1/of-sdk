import { getTasks } from '../../osa/omnijs';

describe('omnijs', () => {
  describe('read tests', () => {
    it('gets all tasks', async () => {
      const allTasks = await getTasks();
      expect(allTasks).toBeTruthy();
    }, 60000);
  });
});
