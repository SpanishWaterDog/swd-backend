import { serializeError } from 'serialize-error';

enum LogLevel {
  none = 'none',
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
}

enum LogLevelValue {
  none,
  error,
  warn,
  info,
  debug,
}

interface LogBody {
  [key: string]: string | number | LogBody | string[] | number[] | LogBody[];
}

interface LoggerOptions {
  excludeContext: boolean;
}

class Logger {
  private context = new Map();

  public setContext = (name: string, values: unknown) => {
    this.context.set(name, values);
  };

  public clearContext = () => {
    this.context.clear();
  };

  private log = (level: LogLevel, type: string, message: string, body?: LogBody, error?: Error, config?: LoggerOptions): void => {
    if (!LogLevelValue[process.env.LOG_LEVEL as LogLevel] || level === LogLevel.none || LogLevelValue[level] > LogLevelValue[process.env.LOG_LEVEL as LogLevel]) {
      return;
    }

    const context = Object.fromEntries(this.context);
    console[level](
      JSON.stringify({
        date: Date.now(),
        type,
        message,
        body,
        error: serializeError(error),
        ...(config?.excludeContext ? {} : { context }),
      })
    );
  };

  public error = (type: string, message: string, body?: LogBody, error?: unknown, config?: LoggerOptions): void => {
    this.log(LogLevel.error, type, message, body, error as Error, config);
  };

  public warn = (type: string, message: string, body?: LogBody, error?: unknown, config?: LoggerOptions): void => {
    this.log(LogLevel.warn, type, message, body, error as Error, config);
  };

  public info = (type: string, message: string, body?: LogBody, error?: unknown, config?: LoggerOptions): void => {
    this.log(LogLevel.info, type, message, body, error as Error, config);
  };

  public debug = (type: string, message: string, body?: LogBody, error?: unknown, config?: LoggerOptions): void => {
    this.log(LogLevel.debug, type, message, body, error as Error, config);
  };
}

export default new Logger() as Logger;
