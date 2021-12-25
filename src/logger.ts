import * as fs from 'fs';

class Logger {
  error(msg: string): void {
    console.error(msg)
    fs.appendFileSync('./logs/error.log', msg);
  }

  warn(msg: string): void {
    console.warn(msg);
    fs.appendFileSync('./logs/info.log', msg);
  }

  info(msg: string): void {
    console.info(msg);
    fs.appendFileSync('./logs/info.log', msg);
  }

  debug(msg: string): void {
    fs.appendFileSync('./logs/info.log', msg);
  }

  all(msg: string): void {
    fs.appendFileSync('./logs/info.log', msg);
  }

}

export { Logger };
