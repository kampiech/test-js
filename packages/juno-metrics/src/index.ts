import {
  createMiddleware,
  getSummary,
  getContentType
} from '@promster/express';
import {join} from 'path';
import {useConfig} from '@grupa-pracuj/juno-config';
import {Application, Request, Response} from 'express';


export {
  getRequestRecorder,
  timing,
  signalIsUp,
  signalIsNotUp
} from '@promster/express';

const normalizePath = (path: string, {req}: { req: Request }): string => {
  if (req?.route?.path && req?.baseUrl) {
    return join(req.baseUrl, req.route.path);
  }
  return path;
};

const skip = (request: Request) => {
  const config = useConfig() satisfies {
    juno: { metrics: { skip: string[] } }
  }
  return config.juno.metrics?.skip.some((path: string) => request.path.search(path) > -1);
};

// keep in mind - juno .net compatibility
const labels = ['handler', 'code'];

const getLabelValues = (request: Request) => ({
  handler: request.path,
  code: request.statusCode
});

interface TApp extends Application {
  locals: Record<string, unknown>;
}

export const useMetricsMiddleware = (app: TApp) => {
  const config = useConfig() satisfies {
    juno: { metrics: { metricTypes: string[] } }
  }

  return createMiddleware({
    app,
    options: {
      metricTypes: config.juno.metrics.metricTypes,
      // @ts-ignore
      normalizePath,
      // @ts-ignore
      skip,
      labels,
      // @ts-ignore
      getLabelValues
    }
  });
};

export const serveMetrics = async (request: Request, response: Response) => {
  request.statusCode = 200;
  response.setHeader('Content-Type', getContentType());
  response.end(await getSummary());
};
