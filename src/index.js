import winston from "winston";
import slack from "slack-notify";

import UncaughtExceptionTransport from "./transports/uncaught_exception";

class Yodelay {
  constructor(params) {
    this.slackUrl = params.slackUrl;
    this.level = params.level || "debug";
    this.format = params.format;
    this.slack = slack(this.slackUrl);
    this.channel = params.channel;
  }

  initialize() {
    const logger = winston.createLogger({
      level: this.level
    });

    this.setFormat(logger);

    logger.exceptions.handle(
      new UncaughtExceptionTransport({
        logger,
        ...{ slack: this.slack, channel: this.channel }
      })
    );

    return logger;
  }

  setFormat(logger) {
    switch (this.format) {
      case "json":
        logger.add(
          new winston.transports.Console({
            format: winston.format.json()
          })
        );

        break;
      case "simple":
        logger.add(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            )
          })
        );

        break;
      default:
        logger.add(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            )
          })
        );
    }
  }
}

export default Yodelay;
