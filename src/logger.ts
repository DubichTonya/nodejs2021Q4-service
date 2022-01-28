import * as fs from 'fs';

const dotenv = require('dotenv');

dotenv.config();
const loggerLevel = process.env.LOGGER_LEVEL || 1;

class Logger {
  error(msg: string): void {
    const level = 0;
    if (level <= loggerLevel) {
      console.error(msg);
      fs.appendFileSync('./logs/error.log', msg);
    }

  }

  warn(msg: string): void {
    const level = 1;
    if (level <= loggerLevel) {
      console.warn(msg);
      fs.appendFileSync('./logs/info.log', msg);
    }
  }

  info(msg: string): void {
    const level = 2;
    if (level <= loggerLevel) {
      console.info(msg);
      fs.appendFileSync('./logs/info.log', msg);
    }
  }

  debug(msg: string): void {
    const level = 3;
    if (level <= loggerLevel) {
      console.debug(msg);
      fs.appendFileSync('./logs/info.log', msg);
    }
  }

  all(msg: string): void {
    const level = 4;
    if (level <= loggerLevel) {
      console.log(msg);
      fs.appendFileSync('./logs/info.log', msg);
    }
  }

}

export { Logger };
