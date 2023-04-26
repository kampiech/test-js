import express, {Application} from 'express';
import lightship from 'lightship';
import * as http from 'http';
import {
  createHttpTerminator,
} from 'http-terminator';

import {useConfig} from '@grupa-pracuj/juno-config';
import {useLogger} from '@grupa-pracuj/juno-logger';
import {useDeregisterService, useRegisterService} from '@grupa-pracuj/juno-discovery';
import {signalIsUp, signalIsNotUp} from '@grupa-pracuj/juno-metrics';

import {beforeServerStart, beforeServerShutdown, lifecycleEvents} from './lifecycle-events.js';
import {registerMiddlewares} from './middlewares/register.js';

/**
 * Create instance of express js server with full support for Grupa Pracuj environment
 *
 */
export const createServer = async (): Promise<Application> => {
  const logger = useLogger();
  const config = useConfig() satisfies {
    juno: { server: { port: number } };
  };

  const port = config.juno.server.port;

  logger.info('Start server using juno-express');

  beforeServerStart(useRegisterService);

  const _lightship = await lightship.createLightship();
  _lightship.queueBlockingTask(new Promise<void>((resolve) => {
    lifecycleEvents
      .emit('beforeServerStart')
      .then(resolve);
  }));

  const app: Application = express();
  const server: http.Server = app
    .use(registerMiddlewares(app))
    .listen(port, () => {
      //I'm ready, accept incoming requests
      _lightship.signalReady();
      signalIsUp();

      logger.info(`Started listening at port:${port}.`);
    })
    .on('error', error => {
      logger.error({error}, 'There was an error');

      //I'm done, shutting down, don't accept incoming requests
      _lightship.shutdown();
      signalIsNotUp();
    });

  const httpTerminator = createHttpTerminator({
    server
  });

  beforeServerShutdown(useDeregisterService);

  _lightship.registerShutdownHandler(async () => {
    logger.info('Shutdown server');

    await lifecycleEvents.emit('beforeServerShutdown');
    await httpTerminator.terminate();
  });

  return app;
};
