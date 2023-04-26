import {useConfig} from '@grupa-pracuj/juno-config';
import pinoHttp, {AutoLoggingOptions} from 'pino-http';
import {useLogger} from './use-logger.js';

export const useHttpLoggerMiddleware = () => {
  const logger = useLogger();
  const config = useConfig() satisfies {
    juno: { logger: { http: { autoLogging: boolean, ignore: string[] } } };
  };

  let autoLogging: boolean | AutoLoggingOptions = false;
  if (config.juno.logger.http?.autoLogging && config.juno.logger.http?.ignore) {
    autoLogging = {
      ignore: (req: any) => {
        return config.juno.logger.http?.ignore.some(path => {
          return req.path.search(path) > -1
        })
      }
    };
  }

  // @ts-ignore
  return pinoHttp({
    logger,
    autoLogging,
    serializers: {
      req: (req: any) => ({
        id: req.id,
        method: req.method,
        url: req.url,
        userAgent: req.headers['user-agent']
      })
    },
  });
};
