import {Request, Response, Router} from 'express';
import {useConfig} from '@grupa-pracuj/juno-config';
import {serveMetrics} from '@grupa-pracuj/juno-metrics';

export const useRouterMiddleware = () => {
  const router = Router();
  router
    .get('/juno', (req: Request, res: Response) => {
      const config = useConfig() satisfies {
        juno: { project: { name: string, owner: string } }
      };

      res
        .json({
          project: config.juno.project.name,
          owner: config.juno.project.owner
        })
        .end();
    })
    .get('/metrics', serveMetrics)
    .get('/is-alive', (req: Request, res: Response) => res.end('OK'));

  return router;
};
