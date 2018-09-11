import request from "request-promise-native";

class Metric {
  constructor(params) {
    this.apiUrl = params.apiUrl;
    this.appName = params.appName;
  }

  async send(message, errorType) {
    await request({
      method: "POST",
      uri: this.apiUrl,
      body: {
        metricAppName: this.appName,
        errorType: errorType,
        message: message
      },
      json: true
    });
  }
}

export default Metric;
