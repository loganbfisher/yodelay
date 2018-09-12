import request from "request-promise-native";

class Metric {
  constructor(params) {
    this.metricsEndpoint = params.metricsEndpoint;
    this.appName = params.appName;
    this.logger = params.logger;
  }

  async send(message, errorType) {
    try {
      return await request({
        method: "POST",
        uri: this.metricsEndpoint,
        body: {
          metricAppName: this.appName,
          errorType: errorType,
          message: message.data
        },
        json: true
      });
    } catch (e) {
      let logMessage = {
        app: this.appName,
        message: "Metrics api request failed.",
        data: e,
        level: "info"
      };

      this.logger.info(logMessage);
    }
  }
}

export default Metric;
