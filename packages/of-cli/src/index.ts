import { command } from 'yargs';
import AddTask from './commands/addtask';
import Activity from './commands/activity';

command(AddTask).command(Activity).argv;
