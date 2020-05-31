import { CommandModule } from 'yargs';
import { getTasksForPerspective } from '@jacobx1/of-sdk';

const GetTasksForToday: CommandModule = {
  command: 'today',
  describe: 'get tasks from perspective named "Today"',
  handler: async (argv) => {
    const tasks = await getTasksForPerspective('Today');
    tasks.forEach((task) => {
      console.log(task.id, task.name);
    });
  },
};

module.exports = GetTasksForToday;
