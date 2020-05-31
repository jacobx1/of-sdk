import { execFile as exec } from 'child_process';
import OmnifocusContext from '../model/omnijs/OmnifocusContext';

function osa<FN extends (...args: any) => any>(fn: FN) {
  const code = `
        ObjC.import('stdlib')
        var fn   = (${fn.toString()})
        var args = JSON.parse($.getenv('OSA_ARGS'))
        var out  = fn.apply(null, args)
        JSON.stringify(out)
    `;

  const osafn = function <T>(...args: Parameters<FN>) {
    return new Promise<T>((resolve, reject) => {
      const child = exec(
        '/usr/bin/osascript',
        ['-l', 'JavaScript'],
        {
          env: {
            OSA_ARGS: JSON.stringify(args),
          },
          maxBuffer: 1024 * 1000,
        },
        (err, stdout, stderr) => {
          if (err) {
            return reject(err);
          }

          if (stderr) {
            console.log(stderr);
          }

          if (!stdout) {
            resolve(undefined);
          }

          try {
            resolve(JSON.parse(stdout.toString()));
          } catch (e) {
            reject(e);
          }
        }
      );
      child.stdin.write(code);
      child.stdin.end();
    });
  };
  return osafn;
}

declare const Application: any;
declare const flattenedTasks: any;

export const execOmniJsRaw = osa((scpt: string) => {
  const omnifocus = Application('Omnifocus');
  return omnifocus.evaluateJavascript(scpt);
});

const stringifyMapper = (item) => {
  if (typeof item === 'function') {
    return item.toString();
  }
  if (Array.isArray(item)) {
    return `[${item.map(stringifyMapper).join(', ')}]`;
  }

  if (typeof item === 'object' && item != null) {
    const valuesConcated = Object.entries(item)
      .map(([key, val]) => ({
        key,
        val: stringifyMapper(val),
      }))
      .map((item) => `${item.key}: ${item.val}`)
      .join(', ');
    return `{${valuesConcated}}`;
  }
  return JSON.stringify(item);
};

export const stringifyCall = (code, ...args) => {
  function scpt(code, ...scriptArgs) {
    return code.call(this, ...scriptArgs);
  }
  const argList = [code, ...args]
    .map(stringifyMapper)
    .map((val) => `(${val})`)
    .join(', ');
  return `${scpt}; scpt.call(this, ${argList});`;
};

type Tail<T extends any[]> = ((...x: T) => void) extends (
  h: infer A,
  ...t: infer R
) => void
  ? R
  : never;

export const omniFunc = <
  D extends {},
  FN extends (this: OmnifocusContext, deps: D, ...args: any) => any
>(
  code: FN,
  deps: D
) => {
  return (...args: Tail<Parameters<FN>>) => {
    const rawCodeString = stringifyCall(code, deps, ...Array.from(args));
    return execOmniJsRaw<ReturnType<FN>>(rawCodeString);
  };
};
