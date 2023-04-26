import helmet from 'helmet';


export const useHelmetMiddleware = () => {
  return helmet({
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: 'no-referrer-when-downgrade' },
    xssFilter: false,
    contentSecurityPolicy: false,
    hsts: false,
    dnsPrefetchControl: { allow: true }
  });
};
