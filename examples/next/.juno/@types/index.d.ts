// AUTO GENERATED CODE
// Run app-config with 'generate' command to regenerate this file

import '@app-config/main';

export interface Config {
  juno: Juno;
}

export interface Juno {
  discovery: Discovery;
  logger: Logger;
  metrics: Metrics;
  project?: Project;
  server: Server;
}

export interface Discovery {
  check?: DiscoveryCheck;
  checks?: DiscoveryCheck[];
  consul: DiscoveryConsul;
  deregister?: boolean;
  service: DiscoveryService;
  tags: string[];
}

export interface DiscoveryCheck {
  deregistercriticalserviceafter?: string;
  http: string;
  interval: string;
  timeout: string;
}

export interface DiscoveryConsul {
  host: string;
  port: number;
  timeout?: number;
}

export interface DiscoveryService {
  host: string;
  id?: string;
  name: string;
  port: number;
}

export interface Logger {
  file?: LoggerFileConfig;
  http?: LoggerHTTP;
  level?: string;
  name: string;
  pretty: boolean;
  redact?: string[];
}

export interface LoggerFileConfig {
  dir: string;
  level?: string[];
}

export interface LoggerHTTP {
  autoLogging: boolean;
  ignore?: string[];
}

export interface Metrics {
  accuracies: string[];
  metricTypes: string[];
  skip: string[];
}

export interface Project {
  name: string;
  team?: string;
}

export interface Server {
  clientCredentials?: ClientCredentials;
  port: number;
}

export interface ClientCredentials {
  clientId: string;
  clientSecret: string;
  scope?: string;
  tokenHost: string;
}

// augment the default export from app-config
declare module '@grupa-pracuj/juno-config' {
  export interface ExportedConfig extends Config {}
}
