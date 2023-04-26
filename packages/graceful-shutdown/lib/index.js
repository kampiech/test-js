const gracefulShutdown = ({
  logger, production, server, timeout
}) => {
  let shuttingDown = false;

  return signal => {
    // Don't bother with graceful shutdown on development to speed up round trip
    if (!production) {
      logger.info('Development without graceful shutdown');
      return process.exit(1);
    }

    if (shuttingDown) {
      return process.exit();
    }

    shuttingDown = true;
    logger.info(`Received kill signal (${signal}), shutting down`);

    setTimeout(() => {
      // use console.log because appLogger don't write message when process exit.
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, timeout).unref();

    return server.close(error => {
      if (error) {
        // use console.log because appLogger don't write message when process exit.
        console.error(`Closed out remaining connections with error. Error: ${error.message}`);
        throw error();
      }

      // use console.log because appLogger don't write message when process exit.
      console.log('Closed out remaining connections.');
      process.exit();
    });
  };
};

module.exports = gracefulShutdown;
