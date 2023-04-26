import { useServiceAddress } from '@grupa-pracuj/juno-discovery';
import { Router } from '@grupa-pracuj/juno-express';
import { useClientCredentials } from '@grupa-pracuj/juno-auth';

const hello = async (req, res) => {
  const getServiceAddress = useServiceAddress();
  const skidblandirAddress = await getServiceAddress('SkidblandirApi-dev');
  const accessToken = await useClientCredentials();
  const result = await fetch(`${skidblandirAddress}/dictionaries/categories?languageCode=pl&isAvailable=true`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await result.json();
  res.json({
    data
  });
};

export const useApi = async () => {
  const router = new Router();
  router
    .get('/hello', hello);

  return router;
};
