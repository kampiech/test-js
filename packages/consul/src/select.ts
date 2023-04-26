import * as Consul from 'consul';


export type HealthService = {
  Service: Consul.Agent.Service
};

const Strategy = {
  Random(services: HealthService[]): Consul.Agent.Service {
    const {Service} = services[Math.floor(Math.random() * services.length)];
    return Service;
  }
};

export default (health: Consul.Health) => (service: string, procedure = Strategy.Random) => {
  return health.service({
    service,
    passing: true
  })
    .then((services: any) => (
      services.length > 0
        ? services
        : Promise.reject(new Error(`Service '${service}' not found in consul.`))))
    .then(procedure);
};
