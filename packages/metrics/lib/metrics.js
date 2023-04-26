const {
  collectDefaultMetrics
} = require('prom-client');

const getMetric = require('./api/get-metric');
const requestMeasurement = require('./api/request-measurement');
const apiRequests = require('./metrics/api-requests');
const httpRequests = require('./metrics/http-requests');
const applicationFailure = require('./metrics/application-failure');
const displayMetrics = require('./middlewares/display-metrics');
const collectRequestMetrics = require('./middlewares/collect-request-metrics');


const httpRequestsTotalCounter = getMetric('http_requests_total') || httpRequests.counter();
const httpRequestsDurationMs = getMetric('http_request_duration_milliseconds') || httpRequests.summary();

const apiRequestsTotalCounter = getMetric('api_requests_total') || apiRequests.counter();
const apiRequestsDurationMs = getMetric('api_request_duration_milliseconds') || apiRequests.summary();

const applicationFailureTotalCounter = getMetric('application_failure_total') || applicationFailure.counter();

const applicationMeasurement = requestMeasurement({
  counter: httpRequestsTotalCounter,
  duration: httpRequestsDurationMs
});

const apiMeasurement = requestMeasurement({
  counter: apiRequestsTotalCounter,
  duration: apiRequestsDurationMs
});

const apiApplicationFailure = ({ error }) => {
  applicationFailureTotalCounter.inc({ error });
};

/**
 *
 */
function initializeMetrics() {
  const metricsInterval = collectDefaultMetrics();

  process.on('SIGTERM', () => {
    clearInterval(metricsInterval);
  });

  return (request, response, next) => {
    response.locals.startEpoch = new Date();
    next();
  };
}

module.exports = {
  initializeMetrics,
  apiApplicationFailure,
  apiMeasurement,
  displayMetrics,
  collectMetrics() {
    return collectRequestMetrics(applicationMeasurement);
  }
};
