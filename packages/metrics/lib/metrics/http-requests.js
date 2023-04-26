const createCounter = require('../api/create-counter');
const createSummary = require('../api/create-summary');


const counter = () => createCounter({
  name: 'http_requests_total',
  help: 'Number of requests'
});

const summary = () => createSummary({
  name: 'http_request_duration_milliseconds',
  help: 'Duration of HTTP requests in ms'
});

module.exports = {
  summary,
  counter
};
