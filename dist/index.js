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
      this.slack.send({
        channel: this.channel,
        text: `:warning: Error Happened`,
        fields: {
          Application: this.appName,
          "Error Message": JSON.stringify(err),
          Data: JSON.stringify(data),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJZb2RlbGF5IiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJsb2dnZXIiLCJ3aW5zdG9uIiwiY3JlYXRlTG9nZ2VyIiwibGV2ZWwiLCJzZXRGb3JtYXQiLCJmb3JtYXQiLCJzbGFjayIsInNsYWNrVXJsIiwiYXBwTmFtZSIsImtpYmFuYVVybCIsImNoYW5uZWwiLCJhbGVydE9uRXJyb3IiLCJpbmZvIiwiZXJyb3IiLCJkZWJ1ZyIsImV4Y2VwdGlvbnMiLCJoYW5kbGUiLCJVbmNhdWdodEV4Y2VwdGlvblRyYW5zcG9ydCIsImJ1aWxkS2liYW5hVXJsIiwibXNnIiwiZGF0YSIsImxvZ01lc3NhZ2UiLCJhcHAiLCJtZXNzYWdlIiwiZXJyIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwic2VuZCIsInRleHQiLCJmaWVsZHMiLCJBcHBsaWNhdGlvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJEYXRhIiwidXJsIiwidGltZSIsImRhdGVGcm9tIiwic3VidHJhY3QiLCJkYXRlVG8iLCJhZGQiLCJzaW1wbGVCYXNlRm9ybWF0IiwiYmFzZSIsInByaW50ZiIsInN0cmluZyIsInRpbWVzdGFtcCIsImNhbGVuZGFyIiwiY29tYmluZSIsInNpbXBsZUJhc2UiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsImpzb24iLCJjb2xvcml6ZSIsInNpbXBsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRUEsTUFBTUEsT0FBTixDQUFjO0FBQ1pDLGNBQVlDLE1BQVosRUFBb0I7QUFDbEIsVUFBTUMsU0FBU0Msa0JBQVFDLFlBQVIsQ0FBcUI7QUFDbENDLGFBQU9KLE9BQU9JO0FBRG9CLEtBQXJCLENBQWY7O0FBSUEsU0FBS0MsU0FBTCxDQUFlSixNQUFmLEVBQXVCRCxPQUFPTSxNQUE5Qjs7QUFFQSxTQUFLQyxLQUFMLEdBQWEsMkJBQU1QLE9BQU9RLFFBQWIsQ0FB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LE9BQWYsQ0FDTjlDLGtCQUFRSSxNQUFSLENBQWUrQyxRQUFmLEVBRE0sRUFFTm5ELGtCQUFRSSxNQUFSLENBQWVnRCxNQUFmLEVBRk0sRUFHTkwsVUFITTtBQURxQixTQUEvQixDQURGOztBQVVBO0FBQ0Y7QUFDRWhELGVBQU93QyxHQUFQLENBQ0UsSUFBSXZDLGtCQUFRZ0QsVUFBUixDQUFtQkMsT0FBdkIsQ0FBK0I7QUFDN0I3QyxrQkFBUUosa0JBQVFJLE1BQVIsQ0FBZTBDLE9BQWYsQ0FDTjlDLGtCQUFRSSxNQUFSLENBQWUrQyxRQUFmLEVBRE0sRUFFTm5ELGtCQUFRSSxNQUFSLENBQWVnRCxNQUFmLEVBRk0sRUFHTkwsVUFITTtBQURxQixTQUEvQixDQURGO0FBekJKO0FBbUNEO0FBOUpXOztrQkFpS0NuRCxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdpbnN0b24gZnJvbSBcIndpbnN0b25cIjtcbmltcG9ydCBzbGFjayBmcm9tIFwic2xhY2stbm90aWZ5XCI7XG5pbXBvcnQgVXJsIGZyb20gXCJ1cmwtcGFyc2VcIjtcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuXG5pbXBvcnQgVW5jYXVnaHRFeGNlcHRpb25UcmFuc3BvcnQgZnJvbSBcIi4vdHJhbnNwb3J0cy91bmNhdWdodF9leGNlcHRpb25cIjtcblxuY2xhc3MgWW9kZWxheSB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIGNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgICAgIGxldmVsOiBwYXJhbXMubGV2ZWxcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0Rm9ybWF0KGxvZ2dlciwgcGFyYW1zLmZvcm1hdCk7XG5cbiAgICB0aGlzLnNsYWNrID0gc2xhY2socGFyYW1zLnNsYWNrVXJsKTtcbiAgICB0aGlzLmFwcE5hbWUgPSBwYXJhbXMuYXBwTmFtZTtcbiAgICB0aGlzLmtpYmFuYVVybCA9IHBhcmFtcy5raWJhbmFVcmw7XG4gICAgdGhpcy5jaGFubmVsID0gcGFyYW1zLmNoYW5uZWw7XG4gICAgdGhpcy5hbGVydE9uRXJyb3IgPSBwYXJhbXMuYWxlcnRPbkVycm9yIHx8IHRydWU7XG4gICAgdGhpcy5sZXZlbCA9IHBhcmFtcy5sZXZlbCB8fCBcImRlYnVnXCI7XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG5cbiAgICB0aGlzLmluZm8gPSB0aGlzLmluZm87XG4gICAgdGhpcy5lcnJvciA9IHRoaXMuZXJyb3I7XG4gICAgdGhpcy5kZWJ1ZyA9IHRoaXMuZGVidWc7XG5cbiAgICBsb2dnZXIuZXhjZXB0aW9ucy5oYW5kbGUoXG4gICAgICBuZXcgVW5jYXVnaHRFeGNlcHRpb25UcmFuc3BvcnQoe1xuICAgICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgICBzbGFjazogdGhpcy5zbGFjayxcbiAgICAgICAga2liYW5hVXJsOiB0aGlzLmtpYmFuYVVybCxcbiAgICAgICAgYnVpbGRLaWJhbmFVcmw6IHRoaXMuYnVpbGRLaWJhbmFVcmwsXG4gICAgICAgIGNoYW5uZWw6IHRoaXMuY2hhbm5lbCxcbiAgICAgICAgYXBwTmFtZTogdGhpcy5hcHBOYW1lXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBkZWJ1Zyhtc2csIGRhdGEpIHtcbiAgICBsZXQgbG9nTWVzc2FnZSA9IHtcbiAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgbGV2ZWw6IFwiZGVidWdcIlxuICAgIH07XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgbG9nTWVzc2FnZS5kYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci5kZWJ1Zyhsb2dNZXNzYWdlKTtcbiAgfVxuXG4gIGluZm8obXNnLCBkYXRhKSB7XG4gICAgbGV0IGxvZ01lc3NhZ2UgPSB7XG4gICAgICBhcHA6IHRoaXMuYXBwTmFtZSxcbiAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgIGxldmVsOiBcImluZm9cIlxuICAgIH07XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgbG9nTWVzc2FnZS5kYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKGxvZ01lc3NhZ2UpO1xuICB9XG5cbiAgZXJyb3IoZXJyLCBkYXRhKSB7XG4gICAgY29uc3QgbG9nTWVzc2FnZSA9IHtcbiAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgbWVzc2FnZTogZXJyLFxuICAgICAgbGV2ZWw6IFwiZXJyb3JcIlxuICAgIH07XG5cbiAgICBpZiAoZGF0YSkge1xuICAgICAgbG9nTWVzc2FnZS5kYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci5lcnJvcihsb2dNZXNzYWdlKTtcblxuICAgIGlmIChcbiAgICAgICghcHJvY2Vzcy5lbnYuTk9ERV9FTlYgJiYgdGhpcy5hbGVydE9uRXJyb3IpIHx8XG4gICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwiZGV2ZWxvcG1lbnRcIiAmJiB0aGlzLmFsZXJ0T25FcnJvcilcbiAgICApIHtcbiAgICAgIHRoaXMuc2xhY2suc2VuZCh7XG4gICAgICAgIGNoYW5uZWw6IHRoaXMuY2hhbm5lbCxcbiAgICAgICAgdGV4dDogYDp3YXJuaW5nOiBFcnJvciBIYXBwZW5lZGAsXG4gICAgICAgIGZpZWxkczoge1xuICAgICAgICAgIEFwcGxpY2F0aW9uOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgICAgXCJFcnJvciBNZXNzYWdlXCI6IEpTT04uc3RyaW5naWZ5KGVyciksXG4gICAgICAgICAgRGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgXCI6Y2hhcnRfd2l0aF91cHdhcmRzX3RyZW5kOiBLaWJhbmEgVXJsXCI6IHRoaXMuYnVpbGRLaWJhbmFVcmwoXG4gICAgICAgICAgICB0aGlzLmtpYmFuYVVybCxcbiAgICAgICAgICAgIG1vbWVudCgpXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBidWlsZEtpYmFuYVVybCh1cmwsIHRpbWUpIHtcbiAgICBjb25zdCBkYXRlRnJvbSA9IHRpbWUuc3VidHJhY3QoMSwgXCJtaW51dGVcIikuZm9ybWF0KCk7XG4gICAgY29uc3QgZGF0ZVRvID0gdGltZS5hZGQoMSwgXCJtaW51dGVcIikuZm9ybWF0KCk7XG5cbiAgICByZXR1cm4gYCR7dXJsfSMvZGlzY292ZXI/X2c9KHJlZnJlc2hJbnRlcnZhbDooZGlzcGxheTpPZmYscGF1c2U6IWYsdmFsdWU6MCksdGltZTooZnJvbToke2RhdGVGcm9tfSxtb2RlOmFic29sdXRlLHRvOiR7ZGF0ZVRvfSkpJl9hPShjb2x1bW5zOiEoX3NvdXJjZSksZmlsdGVyczohKCgnJHN0YXRlJzooc3RvcmU6YXBwU3RhdGUpLG1ldGE6KGFsaWFzOiFuLGRpc2FibGVkOiFmLG5lZ2F0ZTohZixwYXJhbXM6KHF1ZXJ5OiR7XG4gICAgICB0aGlzLmFwcE5hbWVcbiAgICB9LHR5cGU6cGhyYXNlKSx0eXBlOnBocmFzZSx2YWx1ZToke1xuICAgICAgdGhpcy5hcHBOYW1lXG4gICAgfSkpKSxpbnRlcnZhbDphdXRvLHF1ZXJ5OihsYW5ndWFnZTpsdWNlbmUscXVlcnk6J1VuaGFuZGxlZCUyMFJlamVjdGlvbicpLHNvcnQ6ISgnQHRpbWVzdGFtcCcsZGVzYykpYDtcbiAgfVxuXG4gIHNpbXBsZUJhc2VGb3JtYXQoKSB7XG4gICAgY29uc3QgYmFzZSA9IHdpbnN0b24uZm9ybWF0LnByaW50ZihpbmZvID0+IHtcbiAgICAgIGNvbnN0IHN0cmluZyA9IGAke21vbWVudChpbmZvLnRpbWVzdGFtcCkuY2FsZW5kYXIoKX0gWyR7aW5mby5hcHB9XSAke1xuICAgICAgICBpbmZvLmxldmVsXG4gICAgICB9OiAke2luZm8ubWVzc2FnZX1gO1xuXG4gICAgICBpZiAoaW5mby5kYXRhKSB7XG4gICAgICAgIHJldHVybiBgJHtzdHJpbmd9ICR7SlNPTi5zdHJpbmdpZnkoaW5mby5kYXRhKX1gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RyaW5nO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHdpbnN0b24uZm9ybWF0LmNvbWJpbmUod2luc3Rvbi5mb3JtYXQudGltZXN0YW1wKCksIGJhc2UpO1xuICB9XG5cbiAgc2V0Rm9ybWF0KGxvZ2dlciwgZm9ybWF0KSB7XG4gICAgY29uc3Qgc2ltcGxlQmFzZSA9IHRoaXMuc2ltcGxlQmFzZUZvcm1hdCgpO1xuXG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgXCJqc29uXCI6XG4gICAgICAgIGxvZ2dlci5hZGQoXG4gICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgICAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQudGltZXN0YW1wKCksXG4gICAgICAgICAgICAgIHdpbnN0b24uZm9ybWF0Lmpzb24oKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2ltcGxlXCI6XG4gICAgICAgIGxvZ2dlci5hZGQoXG4gICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgICAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgICAgICAgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKCksXG4gICAgICAgICAgICAgIHNpbXBsZUJhc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLmFkZChcbiAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKFxuICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5jb2xvcml6ZSgpLFxuICAgICAgICAgICAgICB3aW5zdG9uLmZvcm1hdC5zaW1wbGUoKSxcbiAgICAgICAgICAgICAgc2ltcGxlQmFzZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFlvZGVsYXk7XG4iXX0=