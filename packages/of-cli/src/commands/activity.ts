import { CommandModule } from 'yargs';
import { getTasks, Task } from '@jacobx1/of-sdk';

interface TransformedTask extends Omit<Task, 'completionDate'> {
  completionDate: Date;
}

const strcmp = (a: string, b: string) => {
  if (a < b) return -1;
  if (b < a) return 1;
  return 0;
};

const Activity: CommandModule = {
  command: 'activity',
  describe: 'get activity chart',
  handler: async (argv) => {
    const tasks = await getTasks((item) => item.completed);
    const transformedTasks = tasks.map<TransformedTask>((task) => ({
      ...task,
      completionDate: new Date(task.completionDate),
    }));

    const sortedTasks = transformedTasks.sort((a, b) => {
      return +a.completionDate - +b.completionDate;
    });

    interface TaskMap {
      [key: string]: TransformedTask[];
    }
    const groupedTasks: TaskMap = {};

    sortedTasks.forEach((task) => {
      const date = task.completionDate.toISOString().slice(0, 10);
      if (groupedTasks[date] === undefined) {
        groupedTasks[date] = [];
      }
      groupedTasks[date].push(task);
    });

    const sortedObjects = Object.entries(groupedTasks).sort((a, b) => {
      return strcmp(a[0], b[0]);
    });

    for (const [key, values] of sortedObjects) {
      console.log(key);
      for (const value of values) {
        console.log(`    ${value.name}`);
      }
    }
  },
};

module.exports = Activity;
