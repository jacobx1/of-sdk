import { execFile as exec } from 'child_process';

export function osa<T>(fn) {
  const code = `
        ObjC.import('stdlib')
        var fn   = (${fn.toString()})
        var args = JSON.parse($.getenv('OSA_ARGS'))
        var out  = fn.apply(null, args)
        JSON.stringify(out)
    `;

  const osafn = function(...args) {
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
