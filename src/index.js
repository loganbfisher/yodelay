import winston from "winston";
import slack from "slack-notify";
import Url from "url-parse";
import moment from "moment";
import { fork } from "child_process";

import UncaughtExceptionTransport from "./transports/uncaught_exception";
import AlertSlack from "./alertSlack";

class Yodelay {
  constructor(params) {
    const logger = winston.createLogger({
      level: params.level
    });

    this.setFormat(logger, params.format);

    this.appName = params.appName;
    this.kibanaUrl = params.kibanaUrl;
    this.channel = params.channel;
    this.alertOnError = params.alertOnError || true;
    this.level = params.level || "debug";
    this.slackUrl = params.slackUrl;
    this.logger = logger;

    this.info = this.info;
    this.error = this.error;
    this.debug = this.debug;

    this.slack = new AlertSlack({
      slackUrl: this.slackUrl,
      kibanaUrl: this.kibanaUrl,
      appName: this.appName
    });

    this.childProcess = fork(
      process.env.LOCAL_DEV === "true"
        ? "src/childProcess.js"
        : "node_modules/yodelay/dist/childProcess.js"
    );

    logger.exceptions.handle(
      new UncaughtExceptionTransport({
        logger: this.logger,
        slackUrl: this.slackUrl,
        kibanaUrl: this.kibanaUrl,
        channel: this.channel,
        appName: this.appName,
        childProcess: this.childProcess
      })
    );
  }

  debug(msg, data) {
    let logMessage = {
      app: this.appName,
      message: msg,
      level: "debug"
    };

    if (data) {
      logMessage.data = data;
    }

    this.logger.debug(logMessage);
  }

  info(msg, data) {
    let logMessage = {
      app: this.appName,
      message: msg,
      level: "info"
    };

    if (data) {
      logMessage.data = data;
    }

    this.logger.info(logMessage);
  }

  error(err, data) {
    const logMessage = {
      app: this.appName,
      message: err,
      level: "error"
    };

    if (data) {
      logMessage.data = data;
    }

    this.logger.error(logMessage);

    if (
      (!process.env.NODE_ENV && this.alertOnError) ||
      (process.env.NODE_ENV !== "development" && this.alertOnError)
    ) {
      this.childProcess.send({
        channel: this.channel,
        error: err,
        type: "error",
        data: data,
        ...{
          slackUrl: this.slackUrl,
          kibanaUrl: this.kibanaUrl,
          appName: this.appName
        }
      });
    }
  }

  simpleBaseFormat() {
    const base = winston.format.printf(info => {
      const string = `${moment(info.timestamp).calendar()} [${info.app}] ${
        info.level
      }: ${info.message}`;

      if (info.data) {
        return `${string} ${JSON.stringify(info.data)}`;
      }

      return string;
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
