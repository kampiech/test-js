const {
  Summary
} = require('prom-client');


module.exports = ({ name, help }) => new Summary({
  name,
  help,
  labelNames: ['handler',
    'code',
    'method'],
  percentiles: [0.5,
    0.9,
    0.99],
  maxAgeSeconds: 600,
  ageBuckets: 5
});
