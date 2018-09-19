import winston from "winston";
import moment from "moment";

import UnhandledRejectionTransport from "./transports/unhandledRejection";

import FormatLogger from "./format";
import Metric from "./metric.js";

class Yodelay {
  constructor(params) {
    this.appName = params.appName;
    this.alertOnError = params.alertOnError || true;
    this.level = params.level || "debug";
    this.metricsEndpoint = params.metricsEndpoint || null;
    this.format = params.format || "json";
    this.debugContext = params.debugContext || null;

    this.info = this.info;
    this.error = this.error;
    this.debug = this.debug;

    const logger = winston.createLogger({
      level: this.level,
      exitOnError: false
    });

    this.logger = logger;
    this.metric = new Metric({
      metricsEndpoint: this.metricsEndpoint,
      appName: this.appName,
      logger: this.logger
    });

    new FormatLogger({
      debugContext: this.debugContext,
      logger: this.logger,
      ...{ format: this.format, appName: this.appName }
    }).setFormat();

    new UnhandledRejectionTransport({
      logger: this.logger,
      appName: this.appName,
      metric: this.metric
    }).initialize();
  }

  debug(message, data, context) {
    const logMessage = this.logger.logMessageFormat(
      message || "",
      data || "",
      context || ""
    );

    this.logger.debug(logMessage);
  }

  info(message, data, context) {
    const logMessage = this.logger.logMessageFormat(
      message || "",
      data || "",
      context || ""
    );

    this.logger.info(logMessage);
  }

  error(message, data, context) {
    const logMessage = this.logger.logMessageFormat(
      message || "",
      data || "",
      context || ""
    );

    this.logger.error(logMessage);

    if (this.metricsEndpoint) {
      this.metric.send(logMessage, "error");
    }
  }
}

export default Yodelay;
