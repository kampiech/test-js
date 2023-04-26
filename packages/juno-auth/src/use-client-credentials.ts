import {AccessToken, ClientCredentials} from 'simple-oauth2';
import {useConfig} from '@grupa-pracuj/juno-config';
import {useLogger} from '@grupa-pracuj/juno-logger';

let accessToken: AccessToken;

type ClientCredentialsConfig = {
  clientId: string,
  clientSecret: string,
  tokenHost: string,
  scope: string
};

const getAccessToken = async ({clientId, clientSecret, tokenHost, scope}: ClientCredentialsConfig) => {
  const client = new ClientCredentials({
    client: {
      id: clientId,
      secret: clientSecret
    },
    auth: {
      tokenHost,
      tokenPath: '/connect/token',
      revokePath: '/connect/revoke'
    }
  });

  return await client.getToken({
    scope: scope
  });
};

export const useClientCredentials = async () => {
  const config = useConfig() satisfies {
    juno: { server: { clientCredentials: ClientCredentialsConfig } };
  };

  const logger = useLogger()
    .child({juno: 'auth'});

  if (!config.juno.server.clientCredentials) {
    throw new Error('Client credentials config is empty');
  }

  const EXPIRATION_WINDOW_IN_SECONDS = 10;
  if (!accessToken || accessToken.expired(EXPIRATION_WINDOW_IN_SECONDS)) {
    try {
      accessToken = await getAccessToken(config.juno.server.clientCredentials as ClientCredentialsConfig);
      const {expires_at} = accessToken.token;
      logger.info({
        expires_at
      }, 'Retrive new access token using client credentials');
    } catch (error) {
      logger.error('Unable to get token');
      throw error;
    }
  }

  return accessToken.token.access_token;
};
