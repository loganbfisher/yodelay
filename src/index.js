import winston from "winston";
import moment from "moment";

import UnhandledRejectionTransport from "./transports/unhandledRejection";

import FormatLogger from "./format";
import Metric from "./metric.js";

class Yodelay {
  constructor(params) {
    const logger = winston.createLogger({
      level: params.level,
      exitOnError: false
    });

    new FormatLogger({ logger, ...{ format: params.format } }).setFormat();

    this.appName = params.appName;
    this.alertOnError = params.alertOnError || true;
    this.level = params.level || "debug";
    this.metricsEndpoint = params.metricsEndpoint;
    this.logger = logger;

    this.metric = new Metric({ apiUrl: this.apiUrl, appName: this.appName });

    this.info = this.info;
    this.error = this.error;
    this.debug = this.debug;

    new UnhandledRejectionTransport({
      logger: this.logger,
      appName: this.appName,
      metric: this.metric
    }).initialize();
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
    this.metric.send(logMessage, "error");
  }
}

export default Yodelay;
