import consul, {ConsulDriver, ConsulOptions} from "@grupa-pracuj/consul";
import { useConfig } from "@grupa-pracuj/juno-config";

let consulInstance: ConsulDriver;

export const useConsul = () => {
  if (consulInstance) {
    return consulInstance;
  }

  const config = useConfig() satisfies {
    juno: { discovery: { consul: ConsulOptions } };
  };
  consulInstance = consul(config.juno.discovery.consul);

  return consulInstance;
};
