import { commandDir } from 'yargs';
import path from 'path';

commandDir('./commands').demandCommand().argv;
