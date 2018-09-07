import winston from "winston";
import slack from "slack-notify";
import Url from "url-parse";
import moment from "moment";

import UncaughtExceptionTransport from "./transports/uncaught_exception";

class Yodelay {
  constructor(params) {
    this.slackUrl = params.slackUrl;
    this.level = params.level || "debug";
    this.format = params.format;
    this.slack = slack(this.slackUrl);
    this.channel = params.channel;
    this.appName = params.appName;
    this.kibanaUrl = params.kibanaUrl;
    this.alertOnError = params.alertOnError || true;
  }

  initialize() {
    const group = winston.createLogger({
      level: this.level
    });

    winston.loggers.add(this.appName, group);

    const logger = winston.loggers.get(this.appName);

    this.setFormat(logger);

    this.logger = logger;

    this.logger.error = this.error;
    this.logger.info = this.info;
    this.logger.debug = this.debug;
    this.logger.buildKibanaUrl = this.buildKibanaUrl;
    this.logger.slack = this.slack;
    this.logger.appName = this.appName;
    this.logger.kibanaUrl = this.kibanaUrl;
    this.logger.channel = this.channel;
    this.logger.alertOnError = this.alertOnError;
    this.logger.level = this.level;

    logger.exceptions.handle(
      new UncaughtExceptionTransport({
        logger: this.logger
      })
    );

    return this.logger;
  }

  debug(msg) {
    if (this.level === "error" || this.level === "debug") {
      this.log({ app: this.appName, message: msg, level: "debug" });
    }
  }

  info(msg) {
    this.log({ app: this.appName, message: msg, level: "info" });
  }

  error(err) {
    if (this.level === "error" || this.level === "debug") {
      this.log({ app: this.appName, message: err, level: "error" });
    }

    if (process.env.NODE_ENV !== "development" && this.alertOnError) {
      this.slack.send({
        channel: this.channel,
        text: `:warning: Error Happened ${moment().calendar()}`,
        fields: {
          Application: this.appName,
          "Error Message": err,
          ":chart_with_upwards_trend: Kibana Url": this.buildKibanaUrl(
            this.kibanaUrl,
            moment()
          )
        }
      });
    }
  }

  buildKibanaUrl(url, time) {
    const dateFrom = time.subtract(1, "minute").format();
    const dateTo = time.add(1, "minute").format();

    return `${url}#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:${dateFrom},mode:absolute,to:${dateTo}))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,negate:!f,params:(query:${
      this.appName
    },type:phrase),type:phrase,value:${
      this.appName
    }))),interval:auto,query:(language:lucene,query:'Unhandled%20Rejection'),sort:!('@timestamp',desc))`;
  }

  simpleBaseFormat() {
    const base = winston.format.printf(info => {
      return `${info.timestamp} [${info.app}] ${info.level}: ${info.message}`;
    });

    return winston.format.combine(winston.format.timestamp(), base);
  }

  setFormat(logger) {
    const simpleBase = this.simpleBaseFormat();

    switch (this.format) {
      case "json":
        logger.add(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json()
            )
          })
        );

        break;
      case "simple":
        logger.add(
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
        logger.add(
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

export default Yodelay;
