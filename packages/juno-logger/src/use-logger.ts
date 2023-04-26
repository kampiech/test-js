import pino from 'pino';
import {useConfig} from '@grupa-pracuj/juno-config';
import {getLogger} from './logger.js';

let logger: pino.Logger;

export const useLogger = (): pino.Logger => {
  if (logger) {
    return logger;
  }

  const config = useConfig() satisfies {
    juno: { logger: { name: string, level: string, redact: string[], file: { dir: string, level: string[] }, pretty: boolean } };
  };

  logger = getLogger(config.juno.logger);
  return logger;
};

