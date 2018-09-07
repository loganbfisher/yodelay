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
  }

  log(info, callback) {
    var _this = this;

    setImmediate(function () {
      _this.logger.log({
        app: _this.logger.appName,
        message: info.message,
        level: info.level,
        timestamp: info.timestamp
      });

      if (process.env.NODE_ENV !== "development") {
        _this.logger.slack.send({
          channel: _this.logger.channel,
          text: `:fire: Uncaught Exception Happened ${(0, _moment2.default)().calendar()}`,
          fields: {
            Application: _this.logger.appName,
            "Error Message": info.message,
            ":chart_with_upwards_trend: Kibana Url": _this.logger.buildKibanaUrl(_this.logger.kibanaUrl, (0, _moment2.default)())
          }
        });
      }
    });
  }
}

exports.default = UncaughtExceptionTransport;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnRzL3VuY2F1Z2h0X2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6WyJVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydCIsIlRyYW5zcG9ydCIsImNvbnN0cnVjdG9yIiwib3B0cyIsImxvZ2dlciIsImxvZyIsImluZm8iLCJjYWxsYmFjayIsInNldEltbWVkaWF0ZSIsImFwcCIsImFwcE5hbWUiLCJtZXNzYWdlIiwibGV2ZWwiLCJ0aW1lc3RhbXAiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJzbGFjayIsInNlbmQiLCJjaGFubmVsIiwidGV4dCIsImNhbGVuZGFyIiwiZmllbGRzIiwiQXBwbGljYXRpb24iLCJidWlsZEtpYmFuYVVybCIsImtpYmFuYVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsMEJBQU4sU0FBeUNDLDBCQUF6QyxDQUFtRDtBQUNqREMsY0FBWUMsSUFBWixFQUFrQjtBQUNoQixVQUFNQSxJQUFOOztBQUVBLFNBQUtDLE1BQUwsR0FBY0QsS0FBS0MsTUFBbkI7QUFDRDs7QUFFREMsTUFBSUMsSUFBSixFQUFVQyxRQUFWLEVBQW9CO0FBQUE7O0FBQ2xCQyxpQkFBYSxZQUFNO0FBQ2pCLFlBQUtKLE1BQUwsQ0FBWUMsR0FBWixDQUFnQjtBQUNkSSxhQUFLLE1BQUtMLE1BQUwsQ0FBWU0sT0FESDtBQUVkQyxpQkFBU0wsS0FBS0ssT0FGQTtBQUdkQyxlQUFPTixLQUFLTSxLQUhFO0FBSWRDLG1CQUFXUCxLQUFLTztBQUpGLE9BQWhCOztBQU9BLFVBQUlDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixhQUE3QixFQUE0QztBQUMxQyxjQUFLWixNQUFMLENBQVlhLEtBQVosQ0FBa0JDLElBQWxCLENBQXVCO0FBQ3JCQyxtQkFBUyxNQUFLZixNQUFMLENBQVllLE9BREE7QUFFckJDLGdCQUFPLHNDQUFxQyx3QkFBU0MsUUFBVCxFQUFvQixFQUYzQztBQUdyQkMsa0JBQVE7QUFDTkMseUJBQWEsTUFBS25CLE1BQUwsQ0FBWU0sT0FEbkI7QUFFTiw2QkFBaUJKLEtBQUtLLE9BRmhCO0FBR04scURBQXlDLE1BQUtQLE1BQUwsQ0FBWW9CLGNBQVosQ0FDdkMsTUFBS3BCLE1BQUwsQ0FBWXFCLFNBRDJCLEVBRXZDLHVCQUZ1QztBQUhuQztBQUhhLFNBQXZCO0FBWUQ7QUFDRixLQXRCRDtBQXVCRDtBQS9CZ0Q7O2tCQWtDcEN6QiwwQiIsImZpbGUiOiJ1bmNhdWdodF9leGNlcHRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJhbnNwb3J0IGZyb20gXCJ3aW5zdG9uLXRyYW5zcG9ydFwiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5cbmNsYXNzIFVuY2F1Z2h0RXhjZXB0aW9uVHJhbnNwb3J0IGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHN1cGVyKG9wdHMpO1xuXG4gICAgdGhpcy5sb2dnZXIgPSBvcHRzLmxvZ2dlcjtcbiAgfVxuXG4gIGxvZyhpbmZvLCBjYWxsYmFjaykge1xuICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5sb2coe1xuICAgICAgICBhcHA6IHRoaXMubG9nZ2VyLmFwcE5hbWUsXG4gICAgICAgIG1lc3NhZ2U6IGluZm8ubWVzc2FnZSxcbiAgICAgICAgbGV2ZWw6IGluZm8ubGV2ZWwsXG4gICAgICAgIHRpbWVzdGFtcDogaW5mby50aW1lc3RhbXBcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgICB0aGlzLmxvZ2dlci5zbGFjay5zZW5kKHtcbiAgICAgICAgICBjaGFubmVsOiB0aGlzLmxvZ2dlci5jaGFubmVsLFxuICAgICAgICAgIHRleHQ6IGA6ZmlyZTogVW5jYXVnaHQgRXhjZXB0aW9uIEhhcHBlbmVkICR7bW9tZW50KCkuY2FsZW5kYXIoKX1gLFxuICAgICAgICAgIGZpZWxkczoge1xuICAgICAgICAgICAgQXBwbGljYXRpb246IHRoaXMubG9nZ2VyLmFwcE5hbWUsXG4gICAgICAgICAgICBcIkVycm9yIE1lc3NhZ2VcIjogaW5mby5tZXNzYWdlLFxuICAgICAgICAgICAgXCI6Y2hhcnRfd2l0aF91cHdhcmRzX3RyZW5kOiBLaWJhbmEgVXJsXCI6IHRoaXMubG9nZ2VyLmJ1aWxkS2liYW5hVXJsKFxuICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5raWJhbmFVcmwsXG4gICAgICAgICAgICAgIG1vbWVudCgpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydDtcbiJdfQ==