import { Command } from 'commander';
import markdown from './actions/markdown';
import initState from './actions/initState';
import pull from './actions/pull';
import { DEFAULT_STATE_KEY } from './types/state';
import split from './actions/split';

const program = new Command();

program
  .command('init')
  .action(initState);

program
  .command('pull')
  .option('-k, --key <stateKey>', 'state key for pull', DEFAULT_STATE_KEY)
  .action((options) => {
    pull(options.key);
  });

program
  .command('md')
  .option('-k, --key <stateKey>', 'state key for generate markdown', DEFAULT_STATE_KEY)
  .action((options) => {
    markdown(options.key);
  });

program
  .command('split')
  .option('-k, --key <stateKey>', 'state key for spilt to directory', DEFAULT_STATE_KEY)
  .action((options) => {
    split(options.key);
  });

program.parse(process.argv);
