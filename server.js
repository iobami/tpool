/* eslint-disable no-restricted-globals */
const config = require('./config');
const app = require('./app');

const normalizerPort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizerPort(config.port);

app.listen(port, () => {
  const address = config.host;
  const bind = typeof host === 'string' ? `pipe ${address}` : `port: ${port}`;
  // const log = `${chalk.yellow('[?]')} ${chalk.green('Checking super admin is seeded...')}`;
  console.log(`[✔] listening on ${bind}`);
  // console.log(log);
});

