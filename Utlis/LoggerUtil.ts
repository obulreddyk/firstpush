/**
 * Custom logger utility for Playwright test automation.
 * Provides formatted console logs with timestamps, log levels, and ANSI coloring.
 */
export class Logger {
  private static getTimestamp(): string {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19);
  }

  private static log(level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG', color: string, message: string, ...optionalParams: any[]) {
    const timestamp = this.getTimestamp();
    const reset = '\x1b[0m';
    const gray = '\x1b[90m';
    
    console.log(
      `${gray}[${timestamp}]${reset} ${color}[${level}]${reset} ${message}`,
      ...optionalParams
    );
  }

  public static info(message: string, ...optionalParams: any[]) {
    const green = '\x1b[32m';
    this.log('INFO', green, message, ...optionalParams);
  }

  public static warn(message: string, ...optionalParams: any[]) {
    const yellow = '\x1b[33m';
    this.log('WARN', yellow, message, ...optionalParams);
  }

  public static error(message: string, ...optionalParams: any[]) {
    const red = '\x1b[31m';
    this.log('ERROR', red, message, ...optionalParams);
  }

  public static debug(message: string, ...optionalParams: any[]) {
    const cyan = '\x1b[36m';
    this.log('DEBUG', cyan, message, ...optionalParams);
  }
}
