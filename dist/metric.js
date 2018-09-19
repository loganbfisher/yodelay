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
      if (!this.metricsEndpoint) {
        return;
      }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRyaWMuanMiXSwibmFtZXMiOlsiTWV0cmljIiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJtZXRyaWNzRW5kcG9pbnQiLCJhcHBOYW1lIiwibG9nZ2VyIiwic2VuZCIsIm1lc3NhZ2UiLCJlcnJvclR5cGUiLCJtZXRob2QiLCJ1cmkiLCJib2R5IiwibWV0cmljQXBwTmFtZSIsImRhdGEiLCJqc29uIiwiZSIsImxvZ01lc3NhZ2UiLCJhcHAiLCJsZXZlbCIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxNQUFNQSxNQUFOLENBQWE7QUFDWEMsY0FBWUMsTUFBWixFQUFvQjtBQUNsQixTQUFLQyxlQUFMLEdBQXVCRCxPQUFPQyxlQUE5QjtBQUNBLFNBQUtDLE9BQUwsR0FBZUYsT0FBT0UsT0FBdEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNILE9BQU9HLE1BQXJCO0FBQ0Q7O0FBRUQsUUFBTUMsSUFBTixDQUFXQyxPQUFYLEVBQW9CQyxTQUFwQixFQUErQjtBQUM3QixRQUFJO0FBQ0YsVUFBSSxDQUFDLEtBQUtMLGVBQVYsRUFBMkI7QUFDekI7QUFDRDs7QUFFRCxhQUFPLE1BQU0sb0NBQVE7QUFDbkJNLGdCQUFRLE1BRFc7QUFFbkJDLGFBQUssS0FBS1AsZUFGUztBQUduQlEsY0FBTTtBQUNKQyx5QkFBZSxLQUFLUixPQURoQjtBQUVKSSxxQkFBV0EsU0FGUDtBQUdKRCxtQkFBU0EsUUFBUU07QUFIYixTQUhhO0FBUW5CQyxjQUFNO0FBUmEsT0FBUixDQUFiO0FBVUQsS0FmRCxDQWVFLE9BQU9DLENBQVAsRUFBVTtBQUNWLFVBQUlDLGFBQWE7QUFDZkMsYUFBSyxLQUFLYixPQURLO0FBRWZHLGlCQUFTLDZCQUZNO0FBR2ZNLGNBQU1FLENBSFM7QUFJZkcsZUFBTztBQUpRLE9BQWpCOztBQU9BLFdBQUtiLE1BQUwsQ0FBWWMsSUFBWixDQUFpQkgsVUFBakI7QUFDRDtBQUNGO0FBakNVOztrQkFvQ0VoQixNIiwiZmlsZSI6Im1ldHJpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXF1ZXN0IGZyb20gXCJyZXF1ZXN0LXByb21pc2UtbmF0aXZlXCI7XG5cbmNsYXNzIE1ldHJpYyB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMubWV0cmljc0VuZHBvaW50ID0gcGFyYW1zLm1ldHJpY3NFbmRwb2ludDtcbiAgICB0aGlzLmFwcE5hbWUgPSBwYXJhbXMuYXBwTmFtZTtcbiAgICB0aGlzLmxvZ2dlciA9IHBhcmFtcy5sb2dnZXI7XG4gIH1cblxuICBhc3luYyBzZW5kKG1lc3NhZ2UsIGVycm9yVHlwZSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXRoaXMubWV0cmljc0VuZHBvaW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICB1cmk6IHRoaXMubWV0cmljc0VuZHBvaW50LFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgbWV0cmljQXBwTmFtZTogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgIGVycm9yVHlwZTogZXJyb3JUeXBlLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UuZGF0YVxuICAgICAgICB9LFxuICAgICAgICBqc29uOiB0cnVlXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsZXQgbG9nTWVzc2FnZSA9IHtcbiAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgIG1lc3NhZ2U6IFwiTWV0cmljcyBhcGkgcmVxdWVzdCBmYWlsZWQuXCIsXG4gICAgICAgIGRhdGE6IGUsXG4gICAgICAgIGxldmVsOiBcImluZm9cIlxuICAgICAgfTtcblxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhsb2dNZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWV0cmljO1xuIl19