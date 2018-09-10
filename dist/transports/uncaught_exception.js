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
    this.slackUrl = opts.slackUrl;
    this.kibanaUrl = opts.kibanaUrl;
    this.channel = opts.channel;
    this.appName = opts.appName;
    this.childProcess = opts.childProcess;
  }

  log(info) {
    var _this = this;

    setImmediate(async function () {
      _this.logger.log({
        app: _this.appName,
        message: info.message,
        level: info.level,
        timestamp: info.timestamp
      });

      if (process.env.NODE_ENV !== "development") {
        _this.childProcess.send(Object.assign({
          channel: _this.channel,
          error: info.message,
          type: "uncaught_exception",
          data: "",
          time: (0, _moment2.default)(info.timestamp)
        }, {
          slackUrl: _this.slackUrl,
          kibanaUrl: _this.kibanaUrl,
          appName: _this.appName
        }));
      }
    });
  }
}

exports.default = UncaughtExceptionTransport;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnRzL3VuY2F1Z2h0X2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6WyJVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydCIsIlRyYW5zcG9ydCIsImNvbnN0cnVjdG9yIiwib3B0cyIsImxvZ2dlciIsInNsYWNrVXJsIiwia2liYW5hVXJsIiwiY2hhbm5lbCIsImFwcE5hbWUiLCJjaGlsZFByb2Nlc3MiLCJsb2ciLCJpbmZvIiwic2V0SW1tZWRpYXRlIiwiYXBwIiwibWVzc2FnZSIsImxldmVsIiwidGltZXN0YW1wIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwic2VuZCIsImVycm9yIiwidHlwZSIsImRhdGEiLCJ0aW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSwwQkFBTixTQUF5Q0MsMEJBQXpDLENBQW1EO0FBQ2pEQyxjQUFZQyxJQUFaLEVBQWtCO0FBQ2hCLFVBQU1BLElBQU47O0FBRUEsU0FBS0MsTUFBTCxHQUFjRCxLQUFLQyxNQUFuQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JGLEtBQUtFLFFBQXJCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkgsS0FBS0csU0FBdEI7QUFDQSxTQUFLQyxPQUFMLEdBQWVKLEtBQUtJLE9BQXBCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlTCxLQUFLSyxPQUFwQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JOLEtBQUtNLFlBQXpCO0FBQ0Q7O0FBRURDLE1BQUlDLElBQUosRUFBVTtBQUFBOztBQUNSQyxpQkFBYSxrQkFBWTtBQUN2QixZQUFLUixNQUFMLENBQVlNLEdBQVosQ0FBZ0I7QUFDZEcsYUFBSyxNQUFLTCxPQURJO0FBRWRNLGlCQUFTSCxLQUFLRyxPQUZBO0FBR2RDLGVBQU9KLEtBQUtJLEtBSEU7QUFJZEMsbUJBQVdMLEtBQUtLO0FBSkYsT0FBaEI7O0FBT0EsVUFBSUMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLGFBQTdCLEVBQTRDO0FBQzFDLGNBQUtWLFlBQUwsQ0FBa0JXLElBQWxCO0FBQ0ViLG1CQUFTLE1BQUtBLE9BRGhCO0FBRUVjLGlCQUFPVixLQUFLRyxPQUZkO0FBR0VRLGdCQUFNLG9CQUhSO0FBSUVDLGdCQUFNLEVBSlI7QUFLRUMsZ0JBQU0sc0JBQU9iLEtBQUtLLFNBQVo7QUFMUixXQU1LO0FBQ0RYLG9CQUFVLE1BQUtBLFFBRGQ7QUFFREMscUJBQVcsTUFBS0EsU0FGZjtBQUdERSxtQkFBUyxNQUFLQTtBQUhiLFNBTkw7QUFZRDtBQUNGLEtBdEJEO0FBdUJEO0FBcENnRDs7a0JBdUNwQ1IsMEIiLCJmaWxlIjoidW5jYXVnaHRfZXhjZXB0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyYW5zcG9ydCBmcm9tIFwid2luc3Rvbi10cmFuc3BvcnRcIjtcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuXG5jbGFzcyBVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydCBleHRlbmRzIFRyYW5zcG9ydCB7XG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBzdXBlcihvcHRzKTtcblxuICAgIHRoaXMubG9nZ2VyID0gb3B0cy5sb2dnZXI7XG4gICAgdGhpcy5zbGFja1VybCA9IG9wdHMuc2xhY2tVcmw7XG4gICAgdGhpcy5raWJhbmFVcmwgPSBvcHRzLmtpYmFuYVVybDtcbiAgICB0aGlzLmNoYW5uZWwgPSBvcHRzLmNoYW5uZWw7XG4gICAgdGhpcy5hcHBOYW1lID0gb3B0cy5hcHBOYW1lO1xuICAgIHRoaXMuY2hpbGRQcm9jZXNzID0gb3B0cy5jaGlsZFByb2Nlc3M7XG4gIH1cblxuICBsb2coaW5mbykge1xuICAgIHNldEltbWVkaWF0ZShhc3luYyAoKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5sb2coe1xuICAgICAgICBhcHA6IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLFxuICAgICAgICBsZXZlbDogaW5mby5sZXZlbCxcbiAgICAgICAgdGltZXN0YW1wOiBpbmZvLnRpbWVzdGFtcFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAgIHRoaXMuY2hpbGRQcm9jZXNzLnNlbmQoe1xuICAgICAgICAgIGNoYW5uZWw6IHRoaXMuY2hhbm5lbCxcbiAgICAgICAgICBlcnJvcjogaW5mby5tZXNzYWdlLFxuICAgICAgICAgIHR5cGU6IFwidW5jYXVnaHRfZXhjZXB0aW9uXCIsXG4gICAgICAgICAgZGF0YTogXCJcIixcbiAgICAgICAgICB0aW1lOiBtb21lbnQoaW5mby50aW1lc3RhbXApLFxuICAgICAgICAgIC4uLntcbiAgICAgICAgICAgIHNsYWNrVXJsOiB0aGlzLnNsYWNrVXJsLFxuICAgICAgICAgICAga2liYW5hVXJsOiB0aGlzLmtpYmFuYVVybCxcbiAgICAgICAgICAgIGFwcE5hbWU6IHRoaXMuYXBwTmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5jYXVnaHRFeGNlcHRpb25UcmFuc3BvcnQ7XG4iXX0=