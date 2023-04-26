import {execSync} from 'child_process';
import {NodePlopAPI} from 'node-plop';

const getPreferredPackageManager = () =>
  (process.env.npm_config_user_agent ?? '').split('/')[0] ||
  'npm';

const requiredDeps = [
  '@grupa-pracuj/juno-auth',
  '@grupa-pracuj/juno-express',
  '@grupa-pracuj/juno-logger',
  '@grupa-pracuj/juno-config',
  '@grupa-pracuj/juno-discovery'
];

const addDeps = async (answers: Record<string, string>) => {
  // @ts-ignore
  const addCommand = {
    pnpm: 'add',
    yarn: 'add',
    npm: 'i --save'
  }[answers['package-manager']];

  const cmd = `${answers['package-manager']} ${addCommand} ${requiredDeps.join(' ')}`;

  if (!answers['add-deps']) {
    return `Skip adding dependencies. Please remember about adding necessary dependencies, using e.g. ${cmd}`;
  }

  execSync(cmd, {stdio: 'inherit'});
  return 'package.json has been updated!';
};

const installDeps = async (answers: Record<string, string>) => {
  if (!answers['install-deps']) {
    return 'Skip installing dependencies';
  }

  execSync(`${answers['package-manager']} install`, {stdio: 'inherit'});

  return 'Dependencies has been installed!';
};

export default (plop: NodePlopAPI) => {
  plop.setGenerator('create-app', {
    description: 'create junoJs app',
    prompts: [{
      type: 'list',
      name: 'app-type',
      message: 'Choose app type',
      choices: ['next', 'nodejs']
    }, {
      type: 'confirm',
      name: 'add-deps',
      message: 'Add necessary dependencies i.e. @grupa-pracuj/juno-express',
      default: true
    }, {
      type: 'confirm',
      name: 'install-deps',
      message: 'Install dependencies using package manager',
      default: false
    }, {
      type: 'list',
      name: 'package-manager',
      message: 'Choose your package manager',
      choices: ['npm', 'pnpm', 'yarn'],
      default: getPreferredPackageManager()
    }],
    actions: [
      {
        type: 'addMany',
        destination: './',
        base: 'templates/{{ app-type }}/',
        templateFiles: 'templates/{{ app-type }}/**/*.hbs'
      },
      addDeps,
      installDeps
    ]
  });
};
