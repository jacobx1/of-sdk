import { CommandModule } from 'yargs';
import { createTask } from '@jacobx1/of-sdk';

interface TaskParams {
  task: string;
}

const AddTask: CommandModule<TaskParams, TaskParams> = {
  command: 'add <task>',
  describe: 'add a task',
  builder: (yargs) => {
    yargs.positional('task', {
      describe: 'title of task to add',
    });
    return yargs;
  },
  handler: (argv) => {
    createTask(argv.task);
  },
};

module.exports = AddTask;
