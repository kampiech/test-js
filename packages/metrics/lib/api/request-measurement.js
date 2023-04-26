const requestMeasurement = ({ counter, duration }) => ({
  method, handler, code, epoch
}) => {
  const responseTimeInMs = Date.now() - epoch;

  counter.inc({ method, handler, code });
  duration.labels(handler, code, method).observe(responseTimeInMs);
};

module.exports = requestMeasurement;
