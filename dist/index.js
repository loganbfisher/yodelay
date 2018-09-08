"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _slackNotify = require("slack-notify");

var _slackNotify2 = _interopRequireDefault(_slackNotify);

var _urlParse = require("url-parse");

var _urlParse2 = _interopRequireDefault(_urlParse);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _uncaught_exception = require("./transports/uncaught_exception");

var _uncaught_exception2 = _interopRequireDefault(_uncaught_exception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Yodelay {
  constructor(params) {
    const logger = _winston2.default.createLogger({
      level: params.level
    });

    this.setFormat(logger, params.format);

    this.slack = (0, _slackNotify2.default)(params.slackUrl);
    this.appName = params.appName;
    this.kibanaUrl = params.kibanaUrl;
    this.channel = params.channel;
    this.alertOnError = params.alertOnError || true;
    this.level = params.level || "debug";
    this.logger = logger;

    this.info = this.info;
    this.error = this.error;
    this.debug = this.debug;

    logger.exceptions.handle(new _uncaught_exception2.default({
      logger: this.logger,
      slack: this.slack,
      kibanaUrl: this.kibanaUrl,
      buildKibanaUrl: this.buildKibanaUrl,
      channel: this.channel,
      appName: this.appName
    }));
  }

  debug(msg, data) {
    this.logger.debug({
      app: this.appName,
      message: msg,
      level: "debug",
      data: data
    });
  }

  info(msg, data) {
    this.logger.info({
      app: this.appName,
      message: msg,
      level: "info",
      data: data
    });
  }

  error(err, data) {
    this.logger.error({
      app: this.appName,
      message: err,
      level: "error",
      data: data
    });

    if (!process.env.NODE_ENV && this.alertOnError || process.env.NODE_ENV !== "development" && this.alertOnError) {
      this.slack.send({
        channel: this.channel,
        text: `:warning: Error Happened`,
        fields: {
          Application: this.appName,
          "Error Message": err,
          Data: data,
          ":chart_with_upwards_trend: Kibana Url": this.buildKibanaUrl(this.kibanaUrl, (0, _moment2.default)())
        }
      });
    }
  }

  buildKibanaUrl(url, time) {
    const dateFrom = time.subtract(1, "minute").format();
    const dateTo = time.add(1, "minute").format();

    return `${url}#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:${dateFrom},mode:absolute,to:${dateTo}))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,negate:!f,params:(query:${this.appName},type:phrase),type:phrase,value:${this.appName}))),interval:auto,query:(language:lucene,query:'Unhandled%20Rejection'),sort:!('@timestamp',desc))`;
  }

  simpleBaseFormat() {
    const base = _winston2.default.format.printf(function (info) {
      return `${info.timestamp} [${info.app}] ${info.level}: ${info.message} ${JSON.stringify(info.data)}`;
    });

    return _winston2.default.format.combine(_winston2.default.format.timestamp(), base);
  }

  setFormat(logger, format) {
    const simpleBase = this.simpleBaseFormat();

    switch (format) {
      case "json":
        logger.add(new _winston2.default.transports.Console({
          format: _winston2.default.format.combine(_winston2.default.format.timestamp(), _winston2.default.format.json())
        }));

        break;
      case "simple":
        logger.add(new _winston2.default.transports.Console({
          format: _winston2.default.format.combine(_winston2.default.format.colorize(), _winston2.default.format.simple(), simpleBase)
        }));

        break;
      default:
        logger.add(new _winston2.default.transports.Console({
          format: _winston2.default.format.combine(_winston2.default.format.colorize(), _winston2.default.format.simple(), simpleBase)
        }));
    }
  }
}

exports.default = Yodelay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJZb2RlbGF5IiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJsb2dnZXIiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJzZXRGb3JtYXQiLCJmb3JtYXQiLCJzbGFjayIsInNsYWNrVXJsIiwiYXBwTmFtZSIsImtpYmFuYVVybCIsImNoYW5uZWwiLCJhbGVydE9uRXJyb3IiLCJpbmZvIiwiZXJyb3IiLCJkZWJ1ZyIsImV4Y2VwdGlvbnMiLCJoYW5kbGUiLCJVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydCIsImJ1aWxkS2liYW5hVXJsIiwibXNnIiwiZGF0YSIsImFwcCIsIm1lc3NhZ2UiLCJlcnIiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJzZW5kIiwidGV4dCIsImZpZWxkcyIsIkFwcGxpY2F0aW9uIiwiRGF0YSIsInVybCIsInRpbWUiLCJkYXRlRnJvbSIsInN1YnRyYWN0IiwiZGF0ZVRvIiwiYWRkIiwic2ltcGxlQmFzZUZvcm1hdCIsImJhc2UiLCJwcmludGYiLCJ0aW1lc3RhbXAiLCJKU09OIiwic3RyaW5naWZ5IiwiY29tYmluZSIsInNpbXBsZUJhc2UiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImpzb24iLCJjb2xvcml6ZSIsInNpbXBsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsTUFBTUEsT0FBTixDQUFjO0FBQ1pDLGNBQVlDLE1BQVosRUFBb0I7QUFDbEIsVUFBTUMsU0FBU0Msa0JBQVFDLFlBQVIsQ0FBcUI7QUFDbENDLGFBQU9KLE9BQU9JO0FBRG9CLEtBQXJCLENBQWY7O0FBSUEsU0FBS0MsU0FBTCxDQUFlSixNQUFmLEVBQXVCRCxPQUFPTSxNQUE5Qjs7QUFFQSxTQUFLQyxLQUFMLEdBQWEsMkJBQU1QLE9BQU9RLFFBQWIsQ0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZVQsT0FBT1MsT0FB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ZW50IjpbImltcG9ydCB3aW5zdG9uIGZyb20gXCJ3aW5zdG9uXCI7XG5pbXBvcnQgc2xhY2sgZnJvbSBcInNsYWNrLW5vdGlmeVwiO1xuaW1wb3J0IFVybCBmcm9tIFwidXJsLXBhcnNlXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcblxuaW1wb3J0IFVuY2F1Z2h0RXhjZXB0aW9uVHJhbnNwb3J0IGZyb20gXCIuL3RyYW5zcG9ydHMvdW5jYXVnaHRfZXhjZXB0aW9uXCI7XG5cbmNsYXNzIFlvZGVsYXkge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICBjb25zdCBsb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7XG4gICAgICBsZXZlbDogcGFyYW1zLmxldmVsXG4gICAgfSk7XG5cbiAgICB0aGlzLnNldEZvcm1hdChsb2dnZXIsIHBhcmFtcy5mb3JtYXQpO1xuXG4gICAgdGhpcy5zbGFjayA9IHNsYWNrKHBhcmFtcy5zbGFja1VybCk7XG4gICAgdGhpcy5hcHBOYW1lID0gcGFyYW1zLmFwcE5hbWU7XG4gICAgdGhpcy5raWJhbmFVcmwgPSBwYXJhbXMua2liYW5hVXJsO1xuICAgIHRoaXMuY2hhbm5lbCA9IHBhcmFtcy5jaGFubmVsO1xuICAgIHRoaXMuYWxlcnRPbkVycm9yID0gcGFyYW1zLmFsZXJ0T25FcnJvciB8fCB0cnVlO1xuICAgIHRoaXMubGV2ZWwgPSBwYXJhbXMubGV2ZWwgfHwgXCJkZWJ1Z1wiO1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuXG4gICAgdGhpcy5pbmZvID0gdGhpcy5pbmZvO1xuICAgIHRoaXMuZXJyb3IgPSB0aGlzLmVycm9yO1xuICAgIHRoaXMuZGVidWcgPSB0aGlzLmRlYnVnO1xuXG4gICAgbG9nZ2VyLmV4Y2VwdGlvbnMuaGFuZGxlKFxuICAgICAgbmV3IFVuY2F1Z2h0RXhjZXB0aW9uVHJhbnNwb3J0KHtcbiAgICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICAgICAgc2xhY2s6IHRoaXMuc2xhY2ssXG4gICAgICAgIGtpYmFuYVVybDogdGhpcy5raWJhbmFVcmwsXG4gICAgICAgIGJ1aWxkS2liYW5hVXJsOiB0aGlzLmJ1aWxkS2liYW5hVXJsLFxuICAgICAgICBjaGFubmVsOiB0aGlzLmNoYW5uZWwsXG4gICAgICAgIGFwcE5hbWU6IHRoaXMuYXBwTmFtZVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZGVidWcobXNnLCBkYXRhKSB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoe1xuICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICBtZXNzYWdlOiBtc2csXG4gICAgICBsZXZlbDogXCJkZWJ1Z1wiLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgaW5mbyhtc2csIGRhdGEpIHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKHtcbiAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgbGV2ZWw6IFwiaW5mb1wiLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgZXJyb3IoZXJyLCBkYXRhKSB7XG4gICAgdGhpcy5sb2dnZXIuZXJyb3Ioe1xuICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICBtZXNzYWdlOiBlcnIsXG4gICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pO1xuXG4gICAgaWYgKFxuICAgICAgKCFwcm9jZXNzLmVudi5OT0RFX0VOViAmJiB0aGlzLmFsZXJ0T25FcnJvcikgfHxcbiAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJkZXZlbG9wbWVudFwiICYmIHRoaXMuYWxlcnRPbkVycm9yKVxuICAgICkge1xuICAgICAgdGhpcy5zbGFjay5zZW5kKHtcbiAgICAgICAgY2hhbm5lbDogdGhpcy5jaGFubmVsLFxuICAgICAgICB0ZXh0OiBgOndhcm5pbmc6IEVycm9yIEhhcHBlbmVkYCxcbiAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgQXBwbGljYXRpb246IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgICBcIkVycm9yIE1lc3NhZ2VcIjogZXJyLFxuICAgICAgICAgIERhdGE6IGRhdGEsXG4gICAgICAgICAgXCI6Y2hhcnRfd2l0aF91cHdhcmRzX3RyZW5kOiBLaWJhbmEgVXJsXCI6IHRoaXMuYnVpbGRLaWJhbmFVcmwoXG4gICAgICAgICAgICB0aGlzLmtpYmFuYVVybCxcbiAgICAgICAgICAgIG1vbWVudCgpXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBidWlsZEtpYmFuYVVybCh1cmwsIHRpbWUpIHtcbiAgICBjb25zdCBkYXRlRnJvbSA9IHRpbWUuc3VidHJhY3QoMSwgXCJtaW51dGVcIikuZm9ybWF0KCk7XG4gICAgY29uc3QgZGF0ZVRvID0gdGltZS5hZGQoMSwgXCJtaW51dGVcIikuZm9ybWF0KCk7XG5cbiAgICByZXR1cm4gYCR7dXJsfSMvZGlzY292ZXI/X2c9KHJlZnJlc2hJbnRlcnZhbDooZGlzcGxheTpPZmYscGF1c2U6IWYsdmFsdWU6MCksdGltZTooZnJvbToke2RhdGVGcm9tfSxtb2RlOmFic29sdXRlLHRvOiR7ZGF0ZVRvfSkpJl9hPShjb2x1bW5zOiEoX3NvdXJjZSksZmlsdGVyczohKCgnJHN0YXRlJzooc3RvcmU6YXBwU3RhdGUpLG1ldGE6KGFsaWFzOiFuLGRpc2FibGVkOiFmLG5lZ2F0ZTohZixwYXJhbXM6KHF1ZXJ5OiR7XG4gICAgICB0aGlzLmFwcE5hbWVcbiAgICB9LHR5cGU6cGhyYXNlKSx0eXBlOnBocmFzZSx2YWx1ZToke1xuICAgICAgdGhpcy5hcHBOYW1lXG4gICAgfSkpKSxpbnRlcnZhbDphdXRvLHF1ZXJ5OihsYW5ndWFnZTpsdWNlbmUscXVlcnk6J1VuaGFuZGxlZCUyMFJlamVjdGlvbicpLHNvcnQ6ISgnQHRpbWVzdGFtcCcsZGVzYykpYDtcbiAgfVxuXG4gIHNpbXBsZUJhc2VGb3JtYXQoKSB7XG4gICAgY29uc3QgYmFzZSA9IHdpbnN0b24uZm9ybWF0LnByaW50ZihpbmZvID0+IHtcbiAgICAgIHJldHVybiBgJHtpbmZvLnRpbWVzdGFtcH0gWyR7aW5mby5hcHB9XSAke2luZm8ubGV2ZWx9OiAke1xuICAgICAgICBpbmZvLm1lc3NhZ2VcbiAgICAgIH0gJHtKU09OLnN0cmluZ2lmeShpbmZvLmRhdGEpfWA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gd2luc3Rvbi5mb3JtYXQuY29tYmluZSh3aW5zdG9uLmZvcm1hdC50aW1lc3RhbXAoKSwgYmFzZSk7XG4gIH1cblxuICBzZXRGb3JtYXQobG9nZ2VyLCBmb3JtYXQpIHtcbiAgICBjb25zdCBzaW1wbGVCYXNlID0gdGhpcy5zaW1wbGVCYXNlRm9ybWF0KCk7XG5cbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgY2FzZSBcImpzb25cIjpcbiAgICAgICAgbG9nZ2VyLmFkZChcbiAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC50aW1lc3RhbXAoKSxcbiAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuanNvbigpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzaW1wbGVcIjpcbiAgICAgICAgbG9nZ2VyLmFkZChcbiAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxuICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKSxcbiAgICAgICAgICAgICAgc2ltcGxlQmFzZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuYWRkKFxuICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICAgICAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXG4gICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnNpbXBsZSgpLFxuICAgICAgICAgICAgICBzaW1wbGVCYXNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWW9kZWxheTtcbiJdfQ==