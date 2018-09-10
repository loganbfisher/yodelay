import Transport from "winston-transport";
import moment from "moment";

class UncaughtExceptionTransport extends Transport {
  constructor(opts) {
    super(opts);

    this.logger = opts.logger;
    this.slackUrl = opts.slackUrl;
    this.kibanaUrl = opts.kibanaUrl;
    this.channel = opts.channel;
    this.appName = opts.appName;
    this.childProcess = opts.childProcess;
  }

  log(info) {
    setImmediate(async () => {
      this.logger.log({
        app: this.appName,
        message: info.message,
        level: info.level,
        timestamp: info.timestamp
      });

      if (process.env.NODE_ENV !== "development") {
        this.childProcess.send({
          channel: this.channel,
          error: info.message,
          type: "uncaught_exception",
          data: "",
          time: moment(info.timestamp),
          ...{
            slackUrl: this.slackUrl,
            kibanaUrl: this.kibanaUrl,
            appName: this.appName
          }
        });
      }
    });
  }
}

export default UncaughtExceptionTransport;
