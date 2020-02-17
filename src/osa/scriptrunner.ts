import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export const runScript = async <TReturn>(name: string, ...args: string[]) => {
  const scriptPath = path.join(__dirname, '../../scripts', name);
  const result = await execAsync(`osascript ${scriptPath} ${args.join(' ')}`);
  return JSON.parse(result.stdout) as TReturn;
};
