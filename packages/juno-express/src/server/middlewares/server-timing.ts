import serverTiming from 'server-timing';


export const useServerTimingMiddleware = () => serverTiming({
  enabled: (req) => req.query.debug === 'true'
});
