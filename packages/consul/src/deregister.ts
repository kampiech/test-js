import * as Consul from 'consul';


export default (agent: Consul.Agent) => (options: Consul.Agent.Service.DeregisterOptions) => agent.service.deregister(options);
