import Transport from "winston-transport";
import moment from "moment";

class UncaughtExceptionTransport extends Transport {
  constructor(opts) {
    super(opts);

    this.logger = opts.logger;
    this.slack = opts.slack;
    this.kibanaUrl = opts.kibanaUrl;
    this.buildKibanaUrl = opts.buildKibanaUrl;
    this.channel = opts.channel;
    this.appName = opts.appName;
  }

  log(info, callback) {
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
          text: `:fire: Uncaught Exception Happened`,
          fields: {
            Application: this.appName,
            "Error Message": info.message,
            ":chart_with_upwards_trend: Kibana Url": this.buildKibanaUrl(
              this.kibanaUrl,
              moment()
            )
          }
        });
      }
    });
  }
}

export default UncaughtExceptionTransport;
