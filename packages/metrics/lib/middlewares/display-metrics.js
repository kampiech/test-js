const {
  register
} = require('prom-client');


module.exports = function displayMetrics(request, response) {
  response.set('Content-Type', register.contentType);
  response.end(register.metrics());
};
