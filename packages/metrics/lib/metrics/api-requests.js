const createCounter = require('../api/create-counter');
const createSummary = require('../api/create-summary');


const counter = () => createCounter({
  name: 'api_requests_total',
  help: 'Number of requests to api'
});

const summary = () => createSummary({
  name: 'api_request_duration_milliseconds',
  help: 'Duration of API requests in ms'
});

module.exports = {
  summary,
  counter
};
