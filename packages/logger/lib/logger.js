const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');

const customRequestFilter = (request, propertyName) => {
  if (propertyName !== 'headers') {
    return request[propertyName];
  }

  return Object.keys(request.headers).reduce((filteredHeaders, key) => {
    const redacted = '[REDACTED]';
    filteredHeaders[key] = key === 'authorization' ? redacted : request.headers[key];
    return filteredHeaders;
  }, {});
};

const removeNestedHeader = (object, level = 0) => {
  if (level === 3) {
    return object;
  }

  return Object.entries(object)
    .map(([key, value]) => {
      if (key === 'authorization') {
        return [key, '[REDACTED]'];
      }
      if (typeof value === 'object' && value !== null) {
        return [key, removeNestedHeader(value, level + 1)];
      }
      return [key, value];
    })
    .reduce(
      (previous, [key, value]) => ({
        ...previous,
        [key]: value
      }),
      {}
    );
};

module.exports = ({
  loggerName = 'grupa-pracuj/logger',
  logsPath = '/logs',
  level = 'info'
}) => {
  /*
   *The transport strategy that saves files based on their size, quantity of files or age of files.
   *Docs: https://github.com/winstonjs/winston-daily-rotate-file
   */
  const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
    filename: `${logsPath}/${loggerName}.%DATE%`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '60m',
    maxFiles: '7d'
  });

  const customAppFormat = winston.format(info => {
    const report = removeNestedHeader(info);

    /*
     * winston operates on symbols which are critical for processing logs.
     * without symbols winston will skip processing this log.
     */
    Object.getOwnPropertySymbols(info).forEach(
      symbol => (report[symbol] = info[symbol])
    );

    Object.assign(report, {
      severity: report.level
    });

    delete report.level;

    // workaround for localhost console output.
    // https://github.com/winstonjs/winston/issues/1338#issuecomment-621736464
    if (process.env.NODE_ENV !== 'production' && info[Symbol.for('splat')]) {
      report.error = info[Symbol.for('splat')]
        .map(({ error }) => error)
        .filter(Boolean)
        .map(({ message }) => message);
    }

    return report;
  });

  const consoleLogTransport = new winston.transports.Console({
    handleExceptions: true
  });

  const appLogger = winston.createLogger({
    level,
    exitOnError: false,
    transports: [
      process.env.NODE_ENV === 'production'
        ? dailyRotateFileTransport
        : consoleLogTransport
    ],
    format: winston.format.combine(
      customAppFormat(),
      winston.format.timestamp(),
      winston.format.json()
    )
  });

  const customErrorHandlerFormat = winston.format(info => {
    Object.assign(info, {
      severity: info.level,
      stack: info.meta.stack,
      exceptionMessage: info.meta.message,
      url: info.meta.req.originalUrl,
      requestUrl:
        info.meta.error && info.meta.error.request
          ? info.meta.error.request.path
          : 'unknown'
    });

    delete info.meta;
    delete info.level;

    return info;
  });

  const errorHandler = expressWinston.errorLogger({
    requestFilter: customRequestFilter,
    transports: [dailyRotateFileTransport],
    format: winston.format.combine(
      customErrorHandlerFormat(),
      winston.format.timestamp(),
      winston.format.json()
    )
  });

  const customErrorLoggerFormat = winston.format(info => {
    const {
      url, baseURL, method, params
    } = info.config;

    Object.assign(info, {
      baseURL,
      method,
      params,
      url,
      exceptionMessage: info.message,
      severity: info.level,
      stack: info.stack
    });

    // if you decide to keep this, remember to erase auth data from headers
    delete info.config;
    delete info.request;
    delete info.response;
    // toJSON would be called in winston.format.json(), ignoring additional props we just added
    delete info.toJSON;

    return info;
  });

  const errorLogger = winston.createLogger({
    requestFilter: customRequestFilter,
    transports: [dailyRotateFileTransport],
    format: winston.format.combine(
      customErrorLoggerFormat(),
      winston.format.timestamp(),
      winston.format.json()
    )
  });

  return {
    appLogger,
    errorHandler,
    errorLogger
  };
};
