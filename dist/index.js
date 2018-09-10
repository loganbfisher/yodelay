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

var _child_process = require("child_process");

var _uncaught_exception = require("./transports/uncaught_exception");

var _uncaught_exception2 = _interopRequireDefault(_uncaught_exception);

var _alertSlack = require("./alertSlack");

var _alertSlack2 = _interopRequireDefault(_alertSlack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Yodelay {
  constructor(params) {
    const logger = _winston2.default.createLogger({
      level: params.level
    });

    this.setFormat(logger, params.format);

    this.appName = params.appName;
    this.kibanaUrl = params.kibanaUrl;
    this.channel = params.channel;
    this.alertOnError = params.alertOnError || true;
    this.level = params.level || "debug";
    this.slackUrl = params.slackUrl;
    this.logger = logger;

    this.info = this.info;
    this.error = this.error;
    this.debug = this.debug;

    this.slack = new _alertSlack2.default({
      slackUrl: this.slackUrl,
      kibanaUrl: this.kibanaUrl,
      appName: this.appName
    });

    this.childProcess = (0, _child_process.fork)(process.env.LOCAL_DEV === "true" ? "src/childProcess.js" : "node_modules/yodelay/dist/childProcess.js");

    logger.exceptions.handle(new _uncaught_exception2.default({
      logger: this.logger,
      slackUrl: this.slackUrl,
      kibanaUrl: this.kibanaUrl,
      channel: this.channel,
      appName: this.appName,
      childProcess: this.childProcess
    }));
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

    if (!process.env.NODE_ENV && this.alertOnError || process.env.NODE_ENV !== "development" && this.alertOnError) {
      this.childProcess.send(Object.assign({
        channel: this.channel,
        error: err,
        type: "error",
        data: data
      }, {
        slackUrl: this.slackUrl,
        kibanaUrl: this.kibanaUrl,
        appName: this.appName
      }));
    }
  }

  simpleBaseFormat() {
    const base = _winston2.default.format.printf(function (info) {
      const string = `${(0, _moment2.default)(info.timestamp).calendar()} [${info.app}] ${info.level}: ${info.message}`;

      if (info.data) {
        return `${string} ${JSON.stringify(info.data)}`;
      }

      return string;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJZb2RlbGF5IiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJsb2dnZXIiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJzZXRGb3JtYXQiLCJmb3JtYXQiLCJhcHBOYW1lIiwia2liYW5hVXJsIiwiY2hhbm5lbCIsImFsZXJ0T25FcnJvciIsInNsYWNrVXJsIiwiaW5mbyIsImVycm9yIiwiZGVidWciLCJzbGFjayIsIkFsZXJ0U2xhY2siLCJjaGlsZFByb2Nlc3MiLCJwcm9jZXNzIiwiZW52IiwiTE9DQUxfREVWIiwiZXhjZXB0aW9ucyIsImhhbmRsZSIsIlVuY2F1Z2h0RXhjZXB0aW9uVHJhbnNwb3J0IiwibXNnIiwiZGF0YSIsImxvZ01lc3NhZ2UiLCJhcHAiLCJtZXNzYWdlIiwiZXJyIiwiTk9ERV9FTlYiLCJzZW5kIiwidHlwZSIsInNpbXBsZUJhc2VGb3JtYXQiLCJiYXNlIiwicHJpbnRmIiwic3RyaW5nIiwidGltZXN0YW1wIiwiY2FsZW5kYXIiLCJKU09OIiwic3RyaW5naWZ5IiwiY29tYmluZSIsInNpbXBsZUJhc2UiLCJhZGQiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImpzb24iLCJjb2xvcml6ZSIsInNpbXBsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxPQUFOLENBQWM7QUFDWkMsY0FBWUMsTUFBWixFQUFvQjtBQUNsQixVQUFNQyxTQUFTQyxrQkFBUUMsWUFBUixDQUFxQjtBQUNsQ0MsYUFBT0osT0FBT0k7QUFEb0IsS0FBckIsQ0FBZjs7QUFJQSxTQUFLQyxTQUFMLENBQWVKLE1BQWYsRUFBdUJELE9BQU9NLE1BQTlCOztBQUVBLFNBQUtDLE9BQUwsR0FBZVAsT0FBT08sT0FBdEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCUixPQUFPUSxTQUF4QjtBQUNBLFNBQUtD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O0FBQzdCdkMsa0JBQVFKLGtCQUFRSSxNQUFSLENBQWVtQyxPQUFmLENBQ052QyxrQkFBUUksTUFBUixDQUFleUMsUUFBZixFQURNLEVBRU43QyxrQkFBUUksTUFBUixDQUFlMEMsTUFBZixFQUZNLEVBR05OLFVBSE07QUFEcUIsU0FBL0IsQ0FERjtBQXpCSjtBQW1DRDtBQTdKVzs7a0JBZ0tDNUMsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3aW5zdG9uIGZyb20gXCJ3aW5zdG9uXCI7XG5pbXBvcnQgc2xhY2sgZnJvbSBcInNsYWNrLW5vdGlmeVwiO1xuaW1wb3J0IFVybCBmcm9tIFwidXJsLXBhcnNlXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7IGZvcmsgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuXG5pbXBvcnQgVW5jYXVnaHRFeGNlcHRpb25UcmFuc3BvcnQgZnJvbSBcIi4vdHJhbnNwb3J0cy91bmNhdWdodF9leGNlcHRpb25cIjtcbmltcG9ydCBBbGVydFNsYWNrIGZyb20gXCIuL2FsZXJ0U2xhY2tcIjtcblxuY2xhc3MgWW9kZWxheSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIGNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgICAgIGxldmVsOiBwYXJhbXMubGV2ZWxcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0Rm9ybWF0KGxvZ2dlciwgcGFyYW1zLmZvcm1hdCk7XG5cbiAgICB0aGlzLmFwcE5hbWUgPSBwYXJhbXMuYXBwTmFtZTtcbiAgICB0aGlzLmtpYmFuYVVybCA9IHBhcmFtcy5raWJhbmFVcmw7XG4gICAgdGhpcy5jaGFubmVsID0gcGFyYW1zLmNoYW5uZWw7XG4gICAgdGhpcy5hbGVydE9uRXJyb3IgPSBwYXJhbXMuYWxlcnRPbkVycm9yIHx8IHRydWU7XG4gICAgdGhpcy5sZXZlbCA9IHBhcmFtcy5sZXZlbCB8fCBcImRlYnVnXCI7XG4gICAgdGhpcy5zbGFja1VybCA9IHBhcmFtcy5zbGFja1VybDtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcblxuICAgIHRoaXMuaW5mbyA9IHRoaXMuaW5mbztcbiAgICB0aGlzLmVycm9yID0gdGhpcy5lcnJvcjtcbiAgICB0aGlzLmRlYnVnID0gdGhpcy5kZWJ1ZztcblxuICAgIHRoaXMuc2xhY2sgPSBuZXcgQWxlcnRTbGFjayh7XG4gICAgICBzbGFja1VybDogdGhpcy5zbGFja1VybCxcbiAgICAgIGtpYmFuYVVybDogdGhpcy5raWJhbmFVcmwsXG4gICAgICBhcHBOYW1lOiB0aGlzLmFwcE5hbWVcbiAgICB9KTtcblxuICAgIHRoaXMuY2hpbGRQcm9jZXNzID0gZm9yayhcbiAgICAgIHByb2Nlc3MuZW52LkxPQ0FMX0RFViA9PT0gXCJ0cnVlXCJcbiAgICAgICAgPyBcInNyYy9jaGlsZFByb2Nlc3MuanNcIlxuICAgICAgICA6IFwibm9kZV9tb2R1bGVzL3lvZGVsYXkvZGlzdC9jaGlsZFByb2Nlc3MuanNcIlxuICAgICk7XG5cbiAgICBsb2dnZXIuZXhjZXB0aW9ucy5oYW5kbGUoXG4gICAgICBuZXcgVW5jYXVnaHRFeGNlcHRpb25UcmFuc3BvcnQoe1xuICAgICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgICBzbGFja1VybDogdGhpcy5zbGFja1VybCxcbiAgICAgICAga2liYW5hVXJsOiB0aGlzLmtpYmFuYVVybCxcbiAgICAgICAgY2hhbm5lbDogdGhpcy5jaGFubmVsLFxuICAgICAgICBhcHBOYW1lOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgIGNoaWxkUHJvY2VzczogdGhpcy5jaGlsZFByb2Nlc3NcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGRlYnVnKG1zZywgZGF0YSkge1xuICAgIGxldCBsb2dNZXNzYWdlID0ge1xuICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICBtZXNzYWdlOiBtc2csXG4gICAgICBsZXZlbDogXCJkZWJ1Z1wiXG4gICAgfTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2dNZXNzYWdlLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGxvZ01lc3NhZ2UpO1xuICB9XG5cbiAgaW5mbyhtc2csIGRhdGEpIHtcbiAgICBsZXQgbG9nTWVzc2FnZSA9IHtcbiAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgbGV2ZWw6IFwiaW5mb1wiXG4gICAgfTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2dNZXNzYWdlLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8obG9nTWVzc2FnZSk7XG4gIH1cblxuICBlcnJvcihlcnIsIGRhdGEpIHtcbiAgICBjb25zdCBsb2dNZXNzYWdlID0ge1xuICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICBtZXNzYWdlOiBlcnIsXG4gICAgICBsZXZlbDogXCJlcnJvclwiXG4gICAgfTtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICBsb2dNZXNzYWdlLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmVycm9yKGxvZ01lc3NhZ2UpO1xuXG4gICAgaWYgKFxuICAgICAgKCFwcm9jZXNzLmVudi5OT0RFX0VOViAmJiB0aGlzLmFsZXJ0T25FcnJvcikgfHxcbiAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJkZXZlbG9wbWVudFwiICYmIHRoaXMuYWxlcnRPbkVycm9yKVxuICAgICkge1xuICAgICAgdGhpcy5jaGlsZFByb2Nlc3Muc2VuZCh7XG4gICAgICAgIGNoYW5uZWw6IHRoaXMuY2hhbm5lbCxcbiAgICAgICAgZXJyb3I6IGVycixcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAuLi57XG4gICAgICAgICAgc2xhY2tVcmw6IHRoaXMuc2xhY2tVcmwsXG4gICAgICAgICAga2liYW5hVXJsOiB0aGlzLmtpYmFuYVVybCxcbiAgICAgICAgICBhcHBOYW1lOiB0aGlzLmFwcE5hbWVcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2ltcGxlQmFzZUZvcm1hdCgpIHtcbiAgICBjb25zdCBiYXNlID0gd2luc3Rvbi5mb3JtYXQucHJpbnRmKGluZm8gPT4ge1xuICAgICAgY29uc3Qgc3RyaW5nID0gYCR7bW9tZW50KGluZm8udGltZXN0YW1wKS5jYWxlbmRhcigpfSBbJHtpbmZvLmFwcH1dICR7XG4gICAgICAgIGluZm8ubGV2ZWxcbiAgICAgIH06ICR7aW5mby5tZXNzYWdlfWA7XG5cbiAgICAgIGlmIChpbmZvLmRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGAke3N0cmluZ30gJHtKU09OLnN0cmluZ2lmeShpbmZvLmRhdGEpfWA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gd2luc3Rvbi5mb3JtYXQuY29tYmluZSh3aW5zdG9uLmZvcm1hdC50aW1lc3RhbXAoKSwgYmFzZSk7XG4gIH1cblxuICBzZXRGb3JtYXQobG9nZ2VyLCBmb3JtYXQpIHtcbiAgICBjb25zdCBzaW1wbGVCYXNlID0gdGhpcy5zaW1wbGVCYXNlRm9ybWF0KCk7XG5cbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgY2FzZSBcImpzb25cIjpcbiAgICAgICAgbG9nZ2VyLmFkZChcbiAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC50aW1lc3RhbXAoKSxcbiAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuanNvbigpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJzaW1wbGVcIjpcbiAgICAgICAgbG9nZ2VyLmFkZChcbiAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxuICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKSxcbiAgICAgICAgICAgICAgc2ltcGxlQmFzZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIuYWRkKFxuICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICAgICAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXG4gICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0LnNpbXBsZSgpLFxuICAgICAgICAgICAgICBzaW1wbGVCYXNlXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWW9kZWxheTtcbiJdfQ==