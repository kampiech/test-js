module.exports = applicationMeasurement => function calculateApplicationTiming(request, response, next) {
  response.once('finish', () => {
    applicationMeasurement({
      method: request.method,
      handler: request.route.path,
      code: response.statusCode,
      epoch: response.locals.startEpoch
    });
  });

  next();
};
