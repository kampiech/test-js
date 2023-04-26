import next from 'next';

import { loadConfig } from '@grupa-pracuj/juno-config';
import { useLogger } from '@grupa-pracuj/juno-logger';
import { beforeServerStart, createServer } from '@grupa-pracuj/juno-express';

const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production';

const nextApp = next({ dev: isDev, quiet: !isDev });
const nextHandler = nextApp.getRequestHandler();

//load app configuration
await loadConfig();

const logger = useLogger();

try {
  beforeServerStart(() => nextApp.prepare());

  const server = await createServer();

  server.use(nextHandler);

} catch (error) {
  logger.error({ error }, 'Server has failed');
  process.exit(1);
}
