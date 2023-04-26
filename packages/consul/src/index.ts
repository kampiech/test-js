import Consul, {ConsulOptions} from 'consul';

export type {ConsulOptions} from 'consul';

import register from './register.js';
import deregister from './deregister.js';
import select, {HealthService} from './select.js';

const timeout = 5000;

export type ConsulDriver = {
  register: (options: Consul.Agent.Service.RegisterOptions) => Promise<any>,
  deregister: (options: Consul.Agent.Service.DeregisterOptions) => Promise<any>,
  select: (service: string, procedure?: (services: HealthService[]) => Consul.Agent.Service) => Promise<any>
};


export default (config?: ConsulOptions | undefined): ConsulDriver => {
  const {agent, health} = new Consul({
    defaults: {
      timeout
    },
    ...config,
    promisify: true
  });

  return {
    register: register(agent),
    deregister: deregister(agent),
    select: select(health)
  };
};
