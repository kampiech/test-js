import {useLogger} from '@grupa-pracuj/juno-logger';
import {useConfig} from '@grupa-pracuj/juno-config';
import {useConsul} from './use-consul.js';


export const useRegisterService = async () => {
  const config = useConfig() satisfies {
    juno: {
      discovery: {
        service: { id: string, name: string, host: string, port: number },
        tags: string[],
        check: any,
        checks: []
      }
    }
  };
  const logger = useLogger();
  const {register} = useConsul();

  const {service, tags, check, checks} = config.juno.discovery;

  const registerData = {
    id: service.id || service.name,
    name: service.name,
    address: service.host,
    port: service.port,
    tags,
    check,
    checks
  };

  try {
    await register(registerData);
    logger.info({register: registerData}, 'Registred in consul');
  } catch (error) {
    logger.error({error}, `Failed to register in consul as ${service.name}`);
    throw error;
  }
};
