import { Command } from "commander";
import initState from "./actions/initState";

const program = new Command();

program
  .command('init')
  .action(initState);

program.parse(process.argv)