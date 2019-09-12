import winston from "winston";

class FormatLogger {
  constructor(params) {
    this.logger = params.logger;
    this.logger.logMessageFormat = this.logMessageFormat.bind(this);
    this.format = params.format;
    this.appName = params.appName;
    this.debugContext = params.debugContext;
  }

  filterContext() {
    return winston.format((info) => {
      if (this.debugContext !== null && info.context !== this.debugContext) {
        return false;
      }

      return info;
    })();
  }

  simpleBaseFormat() {
    const base = winston.format.printf(info => {
      const string = `[${info.app}] ${
        info.context ? `[context: ${info.context}]}` : ""
        } ${info.level}: ${info.message}`;

      if (info.data) {
        return `${string} ${JSON.stringify(info.data)}`;
      }

      return string;
    });

    return winston.format.combine(base);
  }

  logMessageFormat(message, data, context) {
    let logMessage = {
      app: this.appName,
      message: message
    };

    if (data) {
      logMessage.data = data;
    }

    if (context) {
      logMessage.context = context;
    }

    return logMessage;
  }

  setFormat() {
    switch (this.format) {
      case "json":
        this.logger.add(
          new winston.transports.Console({
            format: winston.format.combine(
              this.filterContext(),
              winston.format.json()
            )
          })
        );

        break;
      case "simple":
        this.logger.add(
          new winston.transports.Console({
            format: winston.format.combine(
              this.filterContext(),
              winston.format.colorize(),
              winston.format.simple(),
              this.simpleBaseFormat()
            )
          })
        );

        break;
      default:
        this.logger.add(
          new winston.transports.Console({
            format: winston.format.combine(
              this.filterContext(),
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
