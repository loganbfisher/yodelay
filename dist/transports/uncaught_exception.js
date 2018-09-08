"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winstonTransport = require("winston-transport");

var _winstonTransport2 = _interopRequireDefault(_winstonTransport);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UncaughtExceptionTransport extends _winstonTransport2.default {
  constructor(opts) {
    super(opts);

    this.logger = opts.logger;
    this.slack = opts.slack;
    this.kibanaUrl = opts.kibanaUrl;
    this.buildKibanaUrl = opts.buildKibanaUrl;
    this.channel = opts.channel;
    this.appName = opts.appName;
  }

  log(info, callback) {
    var _this = this;

    setImmediate(function () {
      _this.logger.log({
        app: _this.appName,
        message: info.message,
        level: info.level,
        timestamp: info.timestamp
      });

      if (process.env.NODE_ENV !== "development") {
        _this.slack.send({
          channel: _this.channel,
          text: `:fire: Uncaught Exception Happened`,
          fields: {
            Application: _this.appName,
            "Error Message": JSON.stringify(info.message),
            ":chart_with_upwards_trend: Kibana Url": _this.buildKibanaUrl(_this.kibanaUrl, (0, _moment2.default)())
          }
        });
      }
    });
  }
}

exports.default = UncaughtExceptionTransport;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnRzL3VuY2F1Z2h0X2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6WyJVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydCIsIlRyYW5zcG9ydCIsImNvbnN0cnVjdG9yIiwib3B0cyIsImxvZ2dlciIsInNsYWNrIiwia2liYW5hVXJsIiwiYnVpbGRLaWJhbmFVcmwiLCJjaGFubmVsIiwiYXBwTmFtZSIsImxvZyIsImluZm8iLCJjYWxsYmFjayIsInNldEltbWVkaWF0ZSIsImFwcCIsIm1lc3NhZ2UiLCJsZXZlbCIsInRpbWVzdGFtcCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInNlbmQiLCJ0ZXh0IiwiZmllbGRzIiwiQXBwbGljYXRpb24iLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSwwQkFBTixTQUF5Q0MsMEJBQXpDLENBQW1EO0FBQ2pEQyxjQUFZQyxJQUFaLEVBQWtCO0FBQ2hCLFVBQU1BLElBQU47O0FBRUEsU0FBS0MsTUFBTCxHQUFjRCxLQUFLQyxNQUFuQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUYsS0FBS0UsS0FBbEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCSCxLQUFLRyxTQUF0QjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JKLEtBQUtJLGNBQTNCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlTCxLQUFLSyxPQUFwQjtBQUNBLFNBQUtDLE9BQUwsR0FBZU4sS0FBS00sT0FBcEI7QUFDRDs7QUFFREMsTUFBSUMsSUFBSixFQUFVQyxRQUFWLEVBQW9CO0FBQUE7O0FBQ2xCQyxpQkFBYSxZQUFNO0FBQ2pCLFlBQUtULE1BQUwsQ0FBWU0sR0FBWixDQUFnQjtBQUNkSSxhQUFLLE1BQUtMLE9BREk7QUFFZE0saUJBQVNKLEtBQUtJLE9BRkE7QUFHZEMsZUFBT0wsS0FBS0ssS0FIRTtBQUlkQyxtQkFBV04sS0FBS007QUFKRixPQUFoQjs7QUFPQSxVQUFJQyxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsYUFBN0IsRUFBNEM7QUFDMUMsY0FBS2YsS0FBTCxDQUFXZ0IsSUFBWCxDQUFnQjtBQUNkYixtQkFBUyxNQUFLQSxPQURBO0FBRWRjLGdCQUFPLG9DQUZPO0FBR2RDLGtCQUFRO0FBQ05DLHlCQUFhLE1BQUtmLE9BRFo7QUFFTiw2QkFBaUJnQixLQUFLQyxTQUFMLENBQWVmLEtBQUtJLE9BQXBCLENBRlg7QUFHTixxREFBeUMsTUFBS1IsY0FBTCxDQUN2QyxNQUFLRCxTQURrQyxFQUV2Qyx1QkFGdUM7QUFIbkM7QUFITSxTQUFoQjtBQVlEO0FBQ0YsS0F0QkQ7QUF1QkQ7QUFwQ2dEOztrQkF1Q3BDTiwwQiIsImZpbGUiOiJ1bmNhdWdodF9leGNlcHRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJhbnNwb3J0IGZyb20gXCJ3aW5zdG9uLXRyYW5zcG9ydFwiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5cbmNsYXNzIFVuY2F1Z2h0RXhjZXB0aW9uVHJhbnNwb3J0IGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHN1cGVyKG9wdHMpO1xuXG4gICAgdGhpcy5sb2dnZXIgPSBvcHRzLmxvZ2dlcjtcbiAgICB0aGlzLnNsYWNrID0gb3B0cy5zbGFjaztcbiAgICB0aGlzLmtpYmFuYVVybCA9IG9wdHMua2liYW5hVXJsO1xuICAgIHRoaXMuYnVpbGRLaWJhbmFVcmwgPSBvcHRzLmJ1aWxkS2liYW5hVXJsO1xuICAgIHRoaXMuY2hhbm5lbCA9IG9wdHMuY2hhbm5lbDtcbiAgICB0aGlzLmFwcE5hbWUgPSBvcHRzLmFwcE5hbWU7XG4gIH1cblxuICBsb2coaW5mbywgY2FsbGJhY2spIHtcbiAgICBzZXRJbW1lZGlhdGUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIubG9nKHtcbiAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgIG1lc3NhZ2U6IGluZm8ubWVzc2FnZSxcbiAgICAgICAgbGV2ZWw6IGluZm8ubGV2ZWwsXG4gICAgICAgIHRpbWVzdGFtcDogaW5mby50aW1lc3RhbXBcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgICB0aGlzLnNsYWNrLnNlbmQoe1xuICAgICAgICAgIGNoYW5uZWw6IHRoaXMuY2hhbm5lbCxcbiAgICAgICAgICB0ZXh0OiBgOmZpcmU6IFVuY2F1Z2h0IEV4Y2VwdGlvbiBIYXBwZW5lZGAsXG4gICAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgICBBcHBsaWNhdGlvbjogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgXCJFcnJvciBNZXNzYWdlXCI6IEpTT04uc3RyaW5naWZ5KGluZm8ubWVzc2FnZSksXG4gICAgICAgICAgICBcIjpjaGFydF93aXRoX3Vwd2FyZHNfdHJlbmQ6IEtpYmFuYSBVcmxcIjogdGhpcy5idWlsZEtpYmFuYVVybChcbiAgICAgICAgICAgICAgdGhpcy5raWJhbmFVcmwsXG4gICAgICAgICAgICAgIG1vbWVudCgpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydDtcbiJdfQ==