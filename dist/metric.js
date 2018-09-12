"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Metric {
  constructor(params) {
    this.metricsEndpoint = params.metricsEndpoint;
    this.appName = params.appName;
    this.logger = params.logger;
  }

  async send(message, errorType) {
    try {
      return await (0, _requestPromiseNative2.default)({
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

exports.default = Metric;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRyaWMuanMiXSwibmFtZXMiOlsiTWV0cmljIiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJtZXRyaWNzRW5kcG9pbnQiLCJhcHBOYW1lIiwibG9nZ2VyIiwic2VuZCIsIm1lc3NhZ2UiLCJlcnJvclR5cGUiLCJtZXRob2QiLCJ1cmkiLCJib2R5IiwibWV0cmljQXBwTmFtZSIsImRhdGEiLCJqc29uIiwiZSIsImxvZ01lc3NhZ2UiLCJhcHAiLCJsZXZlbCIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxNQUFNQSxNQUFOLENBQWE7QUFDWEMsY0FBWUMsTUFBWixFQUFvQjtBQUNsQixTQUFLQyxlQUFMLEdBQXVCRCxPQUFPQyxlQUE5QjtBQUNBLFNBQUtDLE9BQUwsR0FBZUYsT0FBT0UsT0FBdEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNILE9BQU9HLE1BQXJCO0FBQ0Q7O0FBRUQsUUFBTUMsSUFBTixDQUFXQyxPQUFYLEVBQW9CQyxTQUFwQixFQUErQjtBQUM3QixRQUFJO0FBQ0YsYUFBTyxNQUFNLG9DQUFRO0FBQ25CQyxnQkFBUSxNQURXO0FBRW5CQyxhQUFLLEtBQUtQLGVBRlM7QUFHbkJRLGNBQU07QUFDSkMseUJBQWUsS0FBS1IsT0FEaEI7QUFFSkkscUJBQVdBLFNBRlA7QUFHSkQsbUJBQVNBLFFBQVFNO0FBSGIsU0FIYTtBQVFuQkMsY0FBTTtBQVJhLE9BQVIsQ0FBYjtBQVVELEtBWEQsQ0FXRSxPQUFPQyxDQUFQLEVBQVU7QUFDVixVQUFJQyxhQUFhO0FBQ2ZDLGFBQUssS0FBS2IsT0FESztBQUVmRyxpQkFBUyw2QkFGTTtBQUdmTSxjQUFNRSxDQUhTO0FBSWZHLGVBQU87QUFKUSxPQUFqQjs7QUFPQSxXQUFLYixNQUFMLENBQVljLElBQVosQ0FBaUJILFVBQWpCO0FBQ0Q7QUFDRjtBQTdCVTs7a0JBZ0NFaEIsTSIsImZpbGUiOiJtZXRyaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tIFwicmVxdWVzdC1wcm9taXNlLW5hdGl2ZVwiO1xuXG5jbGFzcyBNZXRyaWMge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLm1ldHJpY3NFbmRwb2ludCA9IHBhcmFtcy5tZXRyaWNzRW5kcG9pbnQ7XG4gICAgdGhpcy5hcHBOYW1lID0gcGFyYW1zLmFwcE5hbWU7XG4gICAgdGhpcy5sb2dnZXIgPSBwYXJhbXMubG9nZ2VyO1xuICB9XG5cbiAgYXN5bmMgc2VuZChtZXNzYWdlLCBlcnJvclR5cGUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICB1cmk6IHRoaXMubWV0cmljc0VuZHBvaW50LFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgbWV0cmljQXBwTmFtZTogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgIGVycm9yVHlwZTogZXJyb3JUeXBlLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UuZGF0YVxuICAgICAgICB9LFxuICAgICAgICBqc29uOiB0cnVlXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsZXQgbG9nTWVzc2FnZSA9IHtcbiAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiTWV0cmljcyBhcGkgcmVxdWVzdCBmYWlsZWQuXCIsXG4gICAgICAgIGRhdGE6IGUsXG4gICAgICAgIGxldmVsOiBcImluZm9cIlxuICAgICAgfTtcblxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhsb2dNZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWV0cmljO1xuIl19