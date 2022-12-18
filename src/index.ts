import { Command } from "commander";
import InitState from "./actions/InitState";
import pull from "./actions/pull";
import { DEFAULT_STATE_KEY } from "./types/state";

const program = new Command();

program
  .command('init')
  .action(InitState);

program
  .command('pull')
  .option('-k, --key <stateKey>', 'state key for pull', DEFAULT_STATE_KEY)
  .action((options)=>{
    pull(options.key);
  })

program.parse(process.argv)