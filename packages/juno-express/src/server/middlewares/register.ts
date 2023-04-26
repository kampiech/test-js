import express, {Application} from 'express';
import { useMetricsMiddleware } from '@grupa-pracuj/juno-metrics';
import { useHttpLoggerMiddleware } from '@grupa-pracuj/juno-logger';

import { useRouterMiddleware } from './router.js';
import { useHelmetMiddleware } from './helmet.js';
import { useServerTimingMiddleware } from './server-timing.js';

export const registerMiddlewares =  (app: Application): any[] => [
  useServerTimingMiddleware(),
  useMetricsMiddleware(app),
  useHttpLoggerMiddleware(),
  useHelmetMiddleware(),
  express.json(),
  express.urlencoded({
    extended: true
  }),
  useRouterMiddleware()
];
