"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _unhandledRejection = require("./transports/unhandledRejection");

var _unhandledRejection2 = _interopRequireDefault(_unhandledRejection);

var _format = require("./format");

var _format2 = _interopRequireDefault(_format);

var _metric = require("./metric.js");

var _metric2 = _interopRequireDefault(_metric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Yodelay {
  constructor(params) {
    const logger = _winston2.default.createLogger({
      level: params.level,
      exitOnError: false
    });

    new _format2.default(Object.assign({ logger }, { format: params.format })).setFormat();

    this.appName = params.appName;
    this.alertOnError = params.alertOnError || true;
    this.level = params.level || "debug";
    this.metricsEndpoint = params.metricsEndpoint;
    this.logger = logger;

    this.metric = new _metric2.default({ apiUrl: this.apiUrl, appName: this.appName });

    this.info = this.info;
    this.error = this.error;
    this.debug = this.debug;

    new _unhandledRejection2.default({
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

exports.default = Yodelay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJZb2RlbGF5IiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJsb2dnZXIiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJleGl0T25FcnJvciIsIkZvcm1hdExvZ2dlciIsImZvcm1hdCIsInNldEZvcm1hdCIsImFwcE5hbWUiLCJhbGVydE9uRXJyb3IiLCJtZXRyaWNzRW5kcG9pbnQiLCJtZXRyaWMiLCJNZXRyaWMiLCJhcGlVcmwiLCJpbmZvIiwiZXJyb3IiLCJkZWJ1ZyIsIlVuaGFuZGxlZFJlamVjdGlvblRyYW5zcG9ydCIsImluaXRpYWxpemUiLCJtc2ciLCJkYXRhIiwibG9nTWVzc2FnZSIsImFwcCIsIm1lc3NhZ2UiLCJlcnIiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxPQUFOLENBQWM7QUFDWkMsY0FBWUMsTUFBWixFQUFvQjtBQUNsQixVQUFNQyxTQUFTQyxrQkFBUUMsWUFBUixDQUFxQjtBQUNsQ0MsYUFBT0osT0FBT0ksS0FEb0I7QUFFbENDLG1CQUFhO0FBRnFCLEtBQXJCLENBQWY7O0FBS0EsUUFBSUMsZ0JBQUosaUJBQW1CTCxNQUFuQixJQUE4QixFQUFFTSxRQUFRUCxPQUFPTyxNQUFqQixFQUE5QixHQUEyREMsU0FBM0Q7O0FBRUEsU0FBS0MsT0FBTCxHQUFlVCxPQUFPUyxPQUF0QjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JWLE9BQU9VLFlBQVAsSUFBdUIsSUFBM0M7QUFDQSxTQUFLTixLQUFMLEdBQWFKLE9BQU9JLEtBQVAsSUFBZ0IsT0FBN0I7QUFDQSxTQUFLTyxlQUFMLEdBQXVCWCxPQUFPVyxlQUE5QjtBQUNBLFNBQUtWLE1BQUwsR0FBY0EsTUFBZDs7QUFFQSxTQUFLVyxNQUFMLEdBQWMsSUFBSUMsZ0JBQUosQ0FBVyxFQUFFQyxRQUFRLEtBQUtBLE1BQWYsRUFBdUJMLFNBQVMsS0FBS0EsT0FBckMsRUFBWCxDQUFkOztBQUVBLFNBQUtNLElBQUwsR0FBWSxLQUFLQSxJQUFqQjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLQSxLQUFsQjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLQSxLQUFsQjs7QUFFQSxRQUFJQyw0QkFBSixDQUFnQztBQUM5QmpCLGNBQVEsS0FBS0EsTUFEaUI7QUFFOUJRLGVBQVMsS0FBS0EsT0FGZ0I7QUFHOUJHLGNBQVEsS0FBS0E7QUFIaUIsS0FBaEMsRUFJR08sVUFKSDtBQUtEOztBQUVERixRQUFNRyxHQUFOLEVBQVdDLElBQVgsRUFBaUI7QUFDZixRQUFJQyxhQUFhO0FBQ2ZDLFdBQUssS0FBS2QsT0FESztBQUVmZSxlQUFTSixHQUZNO0FBR2ZoQixhQUFPO0FBSFEsS0FBakI7O0FBTUEsUUFBSWlCLElBQUosRUFBVTtBQUNSQyxpQkFBV0QsSUFBWCxHQUFrQkEsSUFBbEI7QUFDRDs7QUFFRCxTQUFLcEIsTUFBTCxDQUFZZ0IsS0FBWixDQUFrQkssVUFBbEI7QUFDRDs7QUFFRFAsT0FBS0ssR0FBTCxFQUFVQyxJQUFWLEVBQWdCO0FBQ2QsUUFBSUMsYUFBYTtBQUNmQyxXQUFLLEtBQUtkLE9BREs7QUFFZmUsZUFBU0osR0FGTTtBQUdmaEIsYUFBTztBQUhRLEtBQWpCOztBQU1BLFFBQUlpQixJQUFKLEVBQVU7QUFDUkMsaUJBQVdELElBQVgsR0FBa0JBLElBQWxCO0FBQ0Q7O0FBRUQsU0FBS3BCLE1BQUwsQ0FBWWMsSUFBWixDQUFpQk8sVUFBakI7QUFDRDs7QUFFRE4sUUFBTVMsR0FBTixFQUFXSixJQUFYLEVBQWlCO0FBQ2YsVUFBTUMsYUFBYTtBQUNqQkMsV0FBSyxLQUFLZCxPQURPO0FBRWpCZSxlQUFTQyxHQUZRO0FBR2pCckIsYUFBTztBQUhVLEtBQW5COztBQU1BLFFBQUlpQixJQUFKLEVBQVU7QUFDUkMsaUJBQVdELElBQVgsR0FBa0JBLElBQWxCO0FBQ0Q7O0FBRUQsU0FBS3BCLE1BQUwsQ0FBWWUsS0FBWixDQUFrQk0sVUFBbEI7QUFDQSxTQUFLVixNQUFMLENBQVljLElBQVosQ0FBaUJKLFVBQWpCLEVBQTZCLE9BQTdCO0FBQ0Q7QUFyRVc7O2tCQXdFQ3hCLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2luc3RvbiBmcm9tIFwid2luc3RvblwiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5cbmltcG9ydCBVbmhhbmRsZWRSZWplY3Rpb25UcmFuc3BvcnQgZnJvbSBcIi4vdHJhbnNwb3J0cy91bmhhbmRsZWRSZWplY3Rpb25cIjtcblxuaW1wb3J0IEZvcm1hdExvZ2dlciBmcm9tIFwiLi9mb3JtYXRcIjtcbmltcG9ydCBNZXRyaWMgZnJvbSBcIi4vbWV0cmljLmpzXCI7XG5cbmNsYXNzIFlvZGVsYXkge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICBjb25zdCBsb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gICAgICBsZXZlbDogcGFyYW1zLmxldmVsLFxuICAgICAgZXhpdE9uRXJyb3I6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBuZXcgRm9ybWF0TG9nZ2VyKHsgbG9nZ2VyLCAuLi57IGZvcm1hdDogcGFyYW1zLmZvcm1hdCB9IH0pLnNldEZvcm1hdCgpO1xuXG4gICAgdGhpcy5hcHBOYW1lID0gcGFyYW1zLmFwcE5hbWU7XG4gICAgdGhpcy5hbGVydE9uRXJyb3IgPSBwYXJhbXMuYWxlcnRPbkVycm9yIHx8IHRydWU7XG4gICAgdGhpcy5sZXZlbCA9IHBhcmFtcy5sZXZlbCB8fCBcImRlYnVnXCI7XG4gICAgdGhpcy5tZXRyaWNzRW5kcG9pbnQgPSBwYXJhbXMubWV0cmljc0VuZHBvaW50O1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuXG4gICAgdGhpcy5tZXRyaWMgPSBuZXcgTWV0cmljKHsgYXBpVXJsOiB0aGlzLmFwaVVybCwgYXBwTmFtZTogdGhpcy5hcHBOYW1lIH0pO1xuXG4gICAgdGhpcy5pbmZvID0gdGhpcy5pbmZvO1xuICAgIHRoaXMuZXJyb3IgPSB0aGlzLmVycm9yO1xuICAgIHRoaXMuZGVidWcgPSB0aGlzLmRlYnVnO1xuXG4gICAgbmV3IFVuaGFuZGxlZFJlamVjdGlvblRyYW5zcG9ydCh7XG4gICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgYXBwTmFtZTogdGhpcy5hcHBOYW1lLFxuICAgICAgbWV0cmljOiB0aGlzLm1ldHJpY1xuICAgIH0pLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGRlYnVnKG1zZywgZGF0YSkge1xuICAgIGxldCBsb2dNZXNzYWdlID0ge1xuICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICBtZXNzYWdlOiBtc2csXG4gICAgICBsZXZlbDogXCJkZWJ1Z1wiXG4gICAgfTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2dNZXNzYWdlLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGxvZ01lc3NhZ2UpO1xuICB9XG5cbiAgaW5mbyhtc2csIGRhdGEpIHtcbiAgICBsZXQgbG9nTWVzc2FnZSA9IHtcbiAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgbGV2ZWw6IFwiaW5mb1wiXG4gICAgfTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2dNZXNzYWdlLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8obG9nTWVzc2FnZSk7XG4gIH1cblxuICBlcnJvcihlcnIsIGRhdGEpIHtcbiAgICBjb25zdCBsb2dNZXNzYWdlID0ge1xuICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICBtZXNzYWdlOiBlcnIsXG4gICAgICBsZXZlbDogXCJlcnJvclwiXG4gICAgfTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2dNZXNzYWdlLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmVycm9yKGxvZ01lc3NhZ2UpO1xuICAgIHRoaXMubWV0cmljLnNlbmQobG9nTWVzc2FnZSwgXCJlcnJvclwiKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBZb2RlbGF5O1xuIl19