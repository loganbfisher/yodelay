import winston from "winston";
import moment from "moment";

class FormatLogger {
  constructor(params) {
    this.logger = params.logger;
    this.logger.logMessageFormat = this.logMessageFormat.bind(this);
    this.format = params.format;
    this.appName = params.appName;
  }

  simpleBaseFormat() {
    const base = winston.format.printf(info => {
      const string = `${moment(info.timestamp)} [${info.app}] ${info.level}: ${
        info.message
      }`;

      if (info.data) {
        return `${string} ${JSON.stringify(info.data)}`;
      }

      return string;
    });

    return winston.format.combine(winston.format.timestamp(), base);
  }

  logMessageFormat(message, data) {
    let logMessage = {
      app: this.appName,
      message: message
    };

    if (data) {
      logMessage.data = data;
    }

    return logMessage;
  }

  setFormat() {
    const simpleBase = this.simpleBaseFormat();

    switch (this.format) {
      case "json":
        this.logger.add(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json()
            )
          })
        );

        break;
      case "simple":
        this.logger.add(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple(),
              simpleBase
            )
          })
        );

        break;
      default:
        this.logger.add(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple(),
              simpleBase
            )
          })
        );
    }
  }
}

export default FormatLogger;
