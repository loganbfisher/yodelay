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

    this.metric = new _metric2.default({
      metricsEndpoint: this.metricsEndpoint,
      appName: this.appName,
      logger: this.logger
    });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJZb2RlbGF5IiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJsb2dnZXIiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJleGl0T25FcnJvciIsIkZvcm1hdExvZ2dlciIsImZvcm1hdCIsInNldEZvcm1hdCIsImFwcE5hbWUiLCJhbGVydE9uRXJyb3IiLCJtZXRyaWNzRW5kcG9pbnQiLCJtZXRyaWMiLCJNZXRyaWMiLCJpbmZvIiwiZXJyb3IiLCJkZWJ1ZyIsIlVuaGFuZGxlZFJlamVjdGlvblRyYW5zcG9ydCIsImluaXRpYWxpemUiLCJtc2ciLCJkYXRhIiwibG9nTWVzc2FnZSIsImFwcCIsIm1lc3NhZ2UiLCJlcnIiLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxPQUFOLENBQWM7QUFDWkMsY0FBWUMsTUFBWixFQUFvQjtBQUNsQixVQUFNQyxTQUFTQyxrQkFBUUMsWUFBUixDQUFxQjtBQUNsQ0MsYUFBT0osT0FBT0ksS0FEb0I7QUFFbENDLG1CQUFhO0FBRnFCLEtBQXJCLENBQWY7O0FBS0EsUUFBSUMsZ0JBQUosaUJBQW1CTCxNQUFuQixJQUE4QixFQUFFTSxRQUFRUCxPQUFPTyxNQUFqQixFQUE5QixHQUEyREMsU0FBM0Q7O0FBRUEsU0FBS0MsT0FBTCxHQUFlVCxPQUFPUyxPQUF0QjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JWLE9BQU9VLFlBQVAsSUFBdUIsSUFBM0M7QUFDQSxTQUFLTixLQUFMLEdBQWFKLE9BQU9JLEtBQVAsSUFBZ0IsT0FBN0I7QUFDQSxTQUFLTyxlQUFMLEdBQXVCWCxPQUFPVyxlQUE5QjtBQUNBLFNBQUtWLE1BQUwsR0FBY0EsTUFBZDs7QUFFQSxTQUFLVyxNQUFMLEdBQWMsSUFBSUMsZ0JBQUosQ0FBVztBQUN2QkYsdUJBQWlCLEtBQUtBLGVBREM7QUFFdkJGLGVBQVMsS0FBS0EsT0FGUztBQUd2QlIsY0FBUSxLQUFLQTtBQUhVLEtBQVgsQ0FBZDs7QUFNQSxTQUFLYSxJQUFMLEdBQVksS0FBS0EsSUFBakI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsS0FBS0EsS0FBbEI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsS0FBS0EsS0FBbEI7O0FBRUEsUUFBSUMsNEJBQUosQ0FBZ0M7QUFDOUJoQixjQUFRLEtBQUtBLE1BRGlCO0FBRTlCUSxlQUFTLEtBQUtBLE9BRmdCO0FBRzlCRyxjQUFRLEtBQUtBO0FBSGlCLEtBQWhDLEVBSUdNLFVBSkg7QUFLRDs7QUFFREYsUUFBTUcsR0FBTixFQUFXQyxJQUFYLEVBQWlCO0FBQ2YsUUFBSUMsYUFBYTtBQUNmQyxXQUFLLEtBQUtiLE9BREs7QUFFZmMsZUFBU0osR0FGTTtBQUdmZixhQUFPO0FBSFEsS0FBakI7O0FBTUEsUUFBSWdCLElBQUosRUFBVTtBQUNSQyxpQkFBV0QsSUFBWCxHQUFrQkEsSUFBbEI7QUFDRDs7QUFFRCxTQUFLbkIsTUFBTCxDQUFZZSxLQUFaLENBQWtCSyxVQUFsQjtBQUNEOztBQUVEUCxPQUFLSyxHQUFMLEVBQVVDLElBQVYsRUFBZ0I7QUFDZCxRQUFJQyxhQUFhO0FBQ2ZDLFdBQUssS0FBS2IsT0FESztBQUVmYyxlQUFTSixHQUZNO0FBR2ZmLGFBQU87QUFIUSxLQUFqQjs7QUFNQSxRQUFJZ0IsSUFBSixFQUFVO0FBQ1JDLGlCQUFXRCxJQUFYLEdBQWtCQSxJQUFsQjtBQUNEOztBQUVELFNBQUtuQixNQUFMLENBQVlhLElBQVosQ0FBaUJPLFVBQWpCO0FBQ0Q7O0FBRUROLFFBQU1TLEdBQU4sRUFBV0osSUFBWCxFQUFpQjtBQUNmLFVBQU1DLGFBQWE7QUFDakJDLFdBQUssS0FBS2IsT0FETztBQUVqQmMsZUFBU0MsR0FGUTtBQUdqQnBCLGFBQU87QUFIVSxLQUFuQjs7QUFNQSxRQUFJZ0IsSUFBSixFQUFVO0FBQ1JDLGlCQUFXRCxJQUFYLEdBQWtCQSxJQUFsQjtBQUNEOztBQUVELFNBQUtuQixNQUFMLENBQVljLEtBQVosQ0FBa0JNLFVBQWxCO0FBQ0EsU0FBS1QsTUFBTCxDQUFZYSxJQUFaLENBQWlCSixVQUFqQixFQUE2QixPQUE3QjtBQUNEO0FBekVXOztrQkE0RUN2QixPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdpbnN0b24gZnJvbSBcIndpbnN0b25cIjtcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuXG5pbXBvcnQgVW5oYW5kbGVkUmVqZWN0aW9uVHJhbnNwb3J0IGZyb20gXCIuL3RyYW5zcG9ydHMvdW5oYW5kbGVkUmVqZWN0aW9uXCI7XG5cbmltcG9ydCBGb3JtYXRMb2dnZXIgZnJvbSBcIi4vZm9ybWF0XCI7XG5pbXBvcnQgTWV0cmljIGZyb20gXCIuL21ldHJpYy5qc1wiO1xuXG5jbGFzcyBZb2RlbGF5IHtcbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgY29uc3QgbG9nZ2VyID0gd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgICAgbGV2ZWw6IHBhcmFtcy5sZXZlbCxcbiAgICAgIGV4aXRPbkVycm9yOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgbmV3IEZvcm1hdExvZ2dlcih7IGxvZ2dlciwgLi4ueyBmb3JtYXQ6IHBhcmFtcy5mb3JtYXQgfSB9KS5zZXRGb3JtYXQoKTtcblxuICAgIHRoaXMuYXBwTmFtZSA9IHBhcmFtcy5hcHBOYW1lO1xuICAgIHRoaXMuYWxlcnRPbkVycm9yID0gcGFyYW1zLmFsZXJ0T25FcnJvciB8fCB0cnVlO1xuICAgIHRoaXMubGV2ZWwgPSBwYXJhbXMubGV2ZWwgfHwgXCJkZWJ1Z1wiO1xuICAgIHRoaXMubWV0cmljc0VuZHBvaW50ID0gcGFyYW1zLm1ldHJpY3NFbmRwb2ludDtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcblxuICAgIHRoaXMubWV0cmljID0gbmV3IE1ldHJpYyh7XG4gICAgICBtZXRyaWNzRW5kcG9pbnQ6IHRoaXMubWV0cmljc0VuZHBvaW50LFxuICAgICAgYXBwTmFtZTogdGhpcy5hcHBOYW1lLFxuICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlclxuICAgIH0pO1xuXG4gICAgdGhpcy5pbmZvID0gdGhpcy5pbmZvO1xuICAgIHRoaXMuZXJyb3IgPSB0aGlzLmVycm9yO1xuICAgIHRoaXMuZGVidWcgPSB0aGlzLmRlYnVnO1xuXG4gICAgbmV3IFVuaGFuZGxlZFJlamVjdGlvblRyYW5zcG9ydCh7XG4gICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgYXBwTmFtZTogdGhpcy5hcHBOYW1lLFxuICAgICAgbWV0cmljOiB0aGlzLm1ldHJpY1xuICAgIH0pLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGRlYnVnKG1zZywgZGF0YSkge1xuICAgIGxldCBsb2dNZXNzYWdlID0ge1xuICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICBtZXNzYWdlOiBtc2csXG4gICAgICBsZXZlbDogXCJkZWJ1Z1wiXG4gICAgfTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2dNZXNzYWdlLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGxvZ01lc3NhZ2UpO1xuICB9XG5cbiAgaW5mbyhtc2csIGRhdGEpIHtcbiAgICBsZXQgbG9nTWVzc2FnZSA9IHtcbiAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgbGV2ZWw6IFwiaW5mb1wiXG4gICAgfTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2dNZXNzYWdlLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8obG9nTWVzc2FnZSk7XG4gIH1cblxuICBlcnJvcihlcnIsIGRhdGEpIHtcbiAgICBjb25zdCBsb2dNZXNzYWdlID0ge1xuICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICBtZXNzYWdlOiBlcnIsXG4gICAgICBsZXZlbDogXCJlcnJvclwiXG4gICAgfTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2dNZXNzYWdlLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmVycm9yKGxvZ01lc3NhZ2UpO1xuICAgIHRoaXMubWV0cmljLnNlbmQobG9nTWVzc2FnZSwgXCJlcnJvclwiKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBZb2RlbGF5O1xuIl19