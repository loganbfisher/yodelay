import unhandledError from "unhandled-error";
import moment from "moment";

class UnhandledRejectionTransport {
  constructor(opts) {
    this.logger = opts.logger;
    this.appName = opts.appName;
    this.metric = opts.metric;
  }

  initialize() {
    unhandledError(
      (error, context) => {
        const errorType = context.hasOwnProperty("promise")
          ? "unhandled_promise_rejection"
          : "unhandled_error";

        const loggerMessage = this.logger.logMessageFormat(error.message);

        this.logger.log({ ...loggerMessage, ...{ level: "error" } });
        this.metric.send(loggerMessage, errorType);
      },
      { doNotCrash: true }
    );
  }
}

export default UnhandledRejectionTransport;
