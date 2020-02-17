import { runScript } from './osa/scriptrunner';

(async function() {
  const data = await runScript('tasks_for_perspective.applescript', 'Today');
  console.log(data);
})().catch(console.error);
