const { register } = require('prom-client');


const getMetric = searchName => register
  .getMetricsAsArray()
  .filter(({ name }) => name === searchName)
  .pop();

module.exports = getMetric;
