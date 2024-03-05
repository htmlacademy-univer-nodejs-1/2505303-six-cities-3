import chalk from 'chalk';
import { Command } from './command.interface';
import { version } from '../../../package.json';


export class VersionCommand implements Command {
  constructor(private readonly filePath: string = './package.json') {}

  private readVersion(): string {
    return version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const vers = this.readVersion();
      console.info(chalk.bgGreen(vers));
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to read version from ${this.filePath}`));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
