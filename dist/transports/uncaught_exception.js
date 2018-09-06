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
    this.channel = opts.channel;
  }

  log(info, callback) {
    var _this = this;

    setImmediate(function () {
      _this.logger.error(info.message);
      _this.slack.send({
        channel: _this.channel,
        text: "Uncaught Exception Warning",
        fields: {
          "Error Message": info.message,
          Time: (0, _moment2.default)().calendar()
        }
      });
    });
  }
}

exports.default = UncaughtExceptionTransport;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnRzL3VuY2F1Z2h0X2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6WyJVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydCIsIlRyYW5zcG9ydCIsImNvbnN0cnVjdG9yIiwib3B0cyIsImxvZ2dlciIsInNsYWNrIiwiY2hhbm5lbCIsImxvZyIsImluZm8iLCJjYWxsYmFjayIsInNldEltbWVkaWF0ZSIsImVycm9yIiwibWVzc2FnZSIsInNlbmQiLCJ0ZXh0IiwiZmllbGRzIiwiVGltZSIsImNhbGVuZGFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSwwQkFBTixTQUF5Q0MsMEJBQXpDLENBQW1EO0FBQ2pEQyxjQUFZQyxJQUFaLEVBQWtCO0FBQ2hCLFVBQU1BLElBQU47O0FBRUEsU0FBS0MsTUFBTCxHQUFjRCxLQUFLQyxNQUFuQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUYsS0FBS0UsS0FBbEI7QUFDQSxTQUFLQyxPQUFMLEdBQWVILEtBQUtHLE9BQXBCO0FBQ0Q7O0FBRURDLE1BQUlDLElBQUosRUFBVUMsUUFBVixFQUFvQjtBQUFBOztBQUNsQkMsaUJBQWEsWUFBTTtBQUNqQixZQUFLTixNQUFMLENBQVlPLEtBQVosQ0FBa0JILEtBQUtJLE9BQXZCO0FBQ0EsWUFBS1AsS0FBTCxDQUFXUSxJQUFYLENBQWdCO0FBQ2RQLGlCQUFTLE1BQUtBLE9BREE7QUFFZFEsY0FBTSw0QkFGUTtBQUdkQyxnQkFBUTtBQUNOLDJCQUFpQlAsS0FBS0ksT0FEaEI7QUFFTkksZ0JBQU0sd0JBQVNDLFFBQVQ7QUFGQTtBQUhNLE9BQWhCO0FBUUQsS0FWRDtBQVdEO0FBckJnRDs7a0JBd0JwQ2pCLDBCIiwiZmlsZSI6InVuY2F1Z2h0X2V4Y2VwdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmFuc3BvcnQgZnJvbSBcIndpbnN0b24tdHJhbnNwb3J0XCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcblxuY2xhc3MgVW5jYXVnaHRFeGNlcHRpb25UcmFuc3BvcnQgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgc3VwZXIob3B0cyk7XG5cbiAgICB0aGlzLmxvZ2dlciA9IG9wdHMubG9nZ2VyO1xuICAgIHRoaXMuc2xhY2sgPSBvcHRzLnNsYWNrO1xuICAgIHRoaXMuY2hhbm5lbCA9IG9wdHMuY2hhbm5lbDtcbiAgfVxuXG4gIGxvZyhpbmZvLCBjYWxsYmFjaykge1xuICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihpbmZvLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5zbGFjay5zZW5kKHtcbiAgICAgICAgY2hhbm5lbDogdGhpcy5jaGFubmVsLFxuICAgICAgICB0ZXh0OiBcIlVuY2F1Z2h0IEV4Y2VwdGlvbiBXYXJuaW5nXCIsXG4gICAgICAgIGZpZWxkczoge1xuICAgICAgICAgIFwiRXJyb3IgTWVzc2FnZVwiOiBpbmZvLm1lc3NhZ2UsXG4gICAgICAgICAgVGltZTogbW9tZW50KCkuY2FsZW5kYXIoKVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydDtcbiJdfQ==