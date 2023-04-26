import {NodePlopAPI} from 'node-plop';

export default async function (plop: NodePlopAPI) {
  await plop.load([
    './create-app-config/create-app-config.js',
    './create-app/create-app.js'
  ]);
}
