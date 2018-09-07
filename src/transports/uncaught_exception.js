import Transport from "winston-transport";
import moment from "moment";

class UncaughtExceptionTransport extends Transport {
  constructor(opts) {
    super(opts);

    this.logger = opts.logger;
  }

  log(info, callback) {
    setImmediate(() => {
      this.logger.log({
        app: this.logger.appName,
        message: info.message,
        level: info.level,
        timestamp: info.timestamp
      });

      if (process.env.NODE_ENV !== "development") {
        this.logger.slack.send({
          channel: this.logger.channel,
          text: `:fire: Uncaught Exception Happened ${moment().calendar()}`,
          fields: {
            Application: this.logger.appName,
            "Error Message": info.message,
            ":chart_with_upwards_trend: Kibana Url": this.logger.buildKibanaUrl(
              this.logger.kibanaUrl,
              moment()
            )
          }
        });
      }
    });
  }
}

export default UncaughtExceptionTransport;
