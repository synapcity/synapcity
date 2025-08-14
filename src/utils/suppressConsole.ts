type ConsoleMethods = Pick<Console, "log" | "info" | "warn" | "error" | "debug" | "trace">;

const noop = () => {};

export const logger: ConsoleMethods =
  process.env.NODE_ENV === "production"
    ? {
        log: noop,
        info: noop,
        warn: noop,
        error: noop,
        debug: noop,
        trace: noop,
      }
    : {
        log: console.log.bind(console),
        info: console.info.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console),
        debug: console.debug.bind(console),
        trace: console.trace.bind(console),
      };

export default logger;
