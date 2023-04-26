const {
  Counter
} = require('prom-client');


module.exports = ({ name, help }) => new Counter({
  name,
  help,
  labelNames: ['handler',
    'code',
    'method']
});
