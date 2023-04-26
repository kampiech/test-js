import {useLogger} from '@grupa-pracuj/juno-logger';
import {useConfig} from '@grupa-pracuj/juno-config';
import {useConsul} from './use-consul.js';


export const useDeregisterService = async () => {
  const logger = useLogger();
  const config = useConfig() satisfies {
    juno: { discovery: { service: { id: string, name: string }, deregister: boolean } }
  };

  const {deregister} = useConsul();

  const {discovery} = config.juno;
  if (!discovery.deregister) {
    logger.info('Deregister service options is disabled');
    return;
  }

  const id = discovery.service.id || discovery.service.name;

  try {
    await deregister({
      id
    });
    logger.info(`Deregister service id: ${id}`);
  } catch (error) {
    logger.error({error}, `Failed to deregister service id: ${id}`);
    throw error;
  }
};
