import {NodePlopAPI} from 'node-plop';

export default (plop: NodePlopAPI) => {
  plop.setGenerator('create-app-config', {
    description: 'create juno-js app config',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Project name, used i.e. as service name in consul'
    }, {
      type: 'input',
      name: 'team',
      message: 'Team'
    }],
    actions: [{
      type: 'addMany',
      destination: '.juno',
      templateFiles: 'templates/.app-config*.hbs',
      force: true
    }]
  });
};
