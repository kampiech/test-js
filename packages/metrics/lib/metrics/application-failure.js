const {
  Counter
} = require('prom-client');


const counter = () => new Counter({
  name: 'application_failure_total',
  help: 'Number of front application failures',
  labelNames: ['error']
});

module.exports = {
  counter
};
