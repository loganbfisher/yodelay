import Transport from "winston-transport";
import moment from "moment";

class UncaughtExceptionTransport extends Transport {
  constructor(opts) {
    super(opts);

    this.logger = opts.logger;
    this.slack = opts.slack;
    this.channel = opts.channel;
  }

  log(info, callback) {
    setImmediate(() => {
      this.logger.error(info.message);
      this.slack.send({
        channel: this.channel,
        text: "Uncaught Exception Warning",
        fields: {
          "Error Message": info.message,
          Time: moment().calendar()
        }
      });
    });
  }
}

export default UncaughtExceptionTransport;
