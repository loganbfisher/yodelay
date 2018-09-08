import winston from "winston";
import slack from "slack-notify";
import Url from "url-parse";
import moment from "moment";

import UncaughtExceptionTransport from "./transports/uncaught_exception";

class Yodelay {
  constructor(params) {
    const logger = winston.createLogger({
      level: params.level
    });

    this.setFormat(logger, params.format);

    this.slack = slack(params.slackUrl);
    this.appName = params.appName;
    this.kibanaUrl = params.kibanaUrl;
    this.channel = params.channel;
    this.alertOnError = params.alertOnError || true;
    this.level = params.level || "debug";
    this.logger = logger;

    this.info = this.info;
    this.error = this.error;
    this.debug = this.debug;

    logger.exceptions.handle(
      new UncaughtExceptionTransport({
        logger: this.logger,
        slack: this.slack,
        kibanaUrl: this.kibanaUrl,
        buildKibanaUrl: this.buildKibanaUrl,
        channel: this.channel,
        appName: this.appName
      })
    );
  }

  debug(msg, data) {
    this.logger.debug({
      app: this.appName,
      message: msg,
      level: "debug",
      data: data
    });
  }

  info(msg, data) {
    this.logger.info({
      app: this.appName,
      message: msg,
      level: "info",
      data: data
    });
  }

  error(err, data) {
    this.logger.error({
      app: this.appName,
      message: err,
      level: "error",
      data: data
    });

    if (
      (!process.env.NODE_ENV && this.alertOnError) ||
      (process.env.NODE_ENV !== "development" && this.alertOnError)
    ) {
      this.slack.send({
        channel: this.channel,
        text: `:warning: Error Happened`,
        fields: {
          Application: this.appName,
          "Error Message": err,
          Data: data,
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
      return `${info.timestamp} [${info.app}] ${info.level}: ${
        info.message
      } ${JSON.stringify(info.data)}`;
    });

    return winston.format.combine(winston.format.timestamp(), base);
  }

  setFormat(logger, format) {
    const simpleBase = this.simpleBaseFormat();

    switch (format) {
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
