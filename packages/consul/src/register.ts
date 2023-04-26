import * as Consul from 'consul';


export default (agent: Consul.Agent) => (options : Consul.Agent.Service.RegisterOptions) => agent.service.register(options);
