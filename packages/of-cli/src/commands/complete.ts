import { CommandModule } from 'yargs';
import { getTasksForPerspective, completeTaskById } from '@jacobx1/of-sdk';

interface CompleteTaskArgs {
  id: string;
}

const CompleteTask: CommandModule<CompleteTaskArgs, CompleteTaskArgs> = {
  command: 'complete <id>',
  describe: 'complete task by id',
  builder: (yargs) =>
    yargs.positional('id', {
      type: 'string',
    }),
  handler: async (argv) => {
    await completeTaskById(argv.id);
  },
};

module.exports = CompleteTask;
