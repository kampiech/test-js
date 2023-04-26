import pino, {LoggerOptions, TransportTargetOptions} from 'pino';
import {existsSync, mkdirSync} from 'node:fs';

type LoggerFileConfig = {
  dir: string,
  level?: string[]
};

type LoggerConfig = {
  name: string,
  level: string,
  redact: string[],
  file: LoggerFileConfig,
  pretty: boolean
};

const getTargets = ({file, level = 'info', pretty = false}: { file: LoggerFileConfig, level: string, pretty: boolean }) => {
  const targets: TransportTargetOptions[] = [];

  if (file) {
    if (!existsSync(file.dir)) {
      mkdirSync(file.dir, { recursive: true });
    }

    if (file?.level?.length && file?.level?.length > 0) {
      file.level.forEach(level => {
        targets.push({
          level,
          target: 'pino/file',
          options: {destination: `${file.dir}/${level}.log`}
        });
      });
    } else {
      targets.push({
        level,
        target: 'pino/file',
        options: {destination: `${file.dir}/logs.log`}
      });
    }
  }

  if (pretty) {
    targets.push({
      level,
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    });
  }

  return targets;
};

export const getLogger = ({name, level = 'info', redact, file, pretty}: LoggerConfig): pino.Logger => {
  const loggerInstanceConfig: LoggerOptions = {
      name,
      level,
      redact,
      mixin
      (_context, level) {
        return {
          severity: pino.levels.labels[level]
        };
      }
    }
  ;

  const targets = getTargets({file, level, pretty});

  if (targets.length > 0) {
    loggerInstanceConfig.transport = {
      targets
    };
  }

  // @ts-ignore
  return pino(loggerInstanceConfig);
};
