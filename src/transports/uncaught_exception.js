import Transport from "winston-transport";
import moment from "moment";

class UncaughtExceptionTransport extends Transport {
  constructor(opts) {
    super(opts);

    this.logger = opts.logger;
    this.slack = opts.slack;
    this.channel = opts.channel;
    this.appName = opts.appName;
  }

  log(info) {
    setImmediate(() => {
      this.logger.log({
        app: this.appName,
        message: info.message,
        level: info.level,
        timestamp: info.timestamp
      });

      if (process.env.NODE_ENV !== "development") {
        this.slack.send({
          channel: this.channel,
          error: info.message,
          type: "uncaught_exception",
          data: data,
          time: info.timestamp
        });
      }
    });
  }
}

export default UncaughtExceptionTransport;
