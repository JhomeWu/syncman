import { Command } from "commander";
import InitState from "./actions/InitState";

const program = new Command();

program
  .command('init')
  .action(InitState);

program.parse(process.argv)