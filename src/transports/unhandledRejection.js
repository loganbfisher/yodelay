import unhandledError from "unhandled-error";
import moment from "moment";

class UnhandledRejectionTransport {
  constructor(opts) {
    this.logger = opts.logger;
    this.appName = opts.appName;
    this.metric = opts.metric;
  }

  initialize() {
    unhandledError((error, context) => {
      const errorType = context.hasOwnProperty("promise")
        ? "unhandled_promise_rejection"
        : "error";

      const message = {
        app: this.appName,
        message: error.message,
        level: "error",
        timestamp: moment().format()
      };

      this.logger.log(message);
      this.metric.send(message, errorType);
    });
  }
}

export default UnhandledRejectionTransport;
