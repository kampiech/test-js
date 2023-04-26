import {useConsul} from './use-consul.js';
import NodeCache from 'node-cache';
import {useConfig} from '@grupa-pracuj/juno-config';
import {useLogger} from '@grupa-pracuj/juno-logger';

const removeHttp = (address: string) => {
  if (address.startsWith('https://')) {
    const https = 'https://';
    return address.slice(https.length);
  }

  if (address.startsWith('http://')) {
    const http = 'http://';
    return address.slice(http.length);
  }

  return address;
};

const cache = new NodeCache();

const getCacheKey = (value: string) => `juno-service-address-${value}`;

export const useServiceAddress = () => {
  const HTTPS_PORT = 443;
  const {select} = useConsul();
  const logger = useLogger().child({
    juno: 'discovery'
  });
  const config = useConfig() satisfies {
    juno: {
      discovery: {
        cache: {
          ttl: number
        }
      }
    }
  };

  return async (name: string) => {
    const cacheKey = getCacheKey(name);
    const cachedServiceAddress = cache.get(cacheKey);
    if (cachedServiceAddress) {
      logger.debug({
        address: cachedServiceAddress,
        service: name
      }, 'Use service address from cache');
      return cachedServiceAddress;
    }

    const serviceAddress = await select(name)
      .then(({Address, Port}) => {
        const Protocool = Port === HTTPS_PORT ? 'https:' : 'http:';
        return {
          Address: removeHttp(Address),
          Port,
          Protocool
        };
      })
      .then(({Address, Port, Protocool}) => `${Protocool}//${Address}:${Port}`);

    logger.debug({
      address: cachedServiceAddress,
      name: name,
      ttl: config.juno.discovery.cache.ttl
    }, 'Cache service address');

    cache.set(cacheKey, serviceAddress, config.juno.discovery.cache.ttl);

    return serviceAddress;
  }
};
