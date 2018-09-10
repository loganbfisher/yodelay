"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slackNotify = require("slack-notify");

var _slackNotify2 = _interopRequireDefault(_slackNotify);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AlertSlack {
  constructor(params) {
    this.slackUrl = params.slackUrl;
    this.slackClient = (0, _slackNotify2.default)(this.slackUrl);
    this.kibanaUrl = params.kibanaUrl;
    this.appName = params.appName;
  }

  send(_ref) {
    let channel = _ref.channel,
        error = _ref.error,
        type = _ref.type,
        data = _ref.data,
        time = _ref.time;

    this.slackClient.send({
      channel: channel,
      text: type === "error" ? `:warning: Error Happened` : `:fire: Uncaught Exception Happened`,
      fields: {
        Application: this.appName,
        "Error Message": JSON.stringify(error),
        Data: JSON.stringify(data),
        ":chart_with_upwards_trend: Kibana Url": this.buildKibanaUrl(this.kibanaUrl, (0, _moment2.default)(time))
      }
    });
  }

  buildKibanaUrl(url, time) {
    const dateFrom = time.subtract(1, "minute").format();
    const dateTo = time.add(1, "minute").format();

    return `${url}#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:${dateFrom},mode:absolute,to:${dateTo}))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,negate:!f,params:(query:${this.appName},type:phrase),type:phrase,value:${this.appName}))),interval:auto,query:(language:lucene,query:'Unhandled%20Rejection'),sort:!('@timestamp',desc))`;
  }
}

exports.default = AlertSlack;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGVydFNsYWNrLmpzIl0sIm5hbWVzIjpbIkFsZXJ0U2xhY2siLCJjb25zdHJ1Y3RvciIsInBhcmFtcyIsInNsYWNrVXJsIiwic2xhY2tDbGllbnQiLCJraWJhbmFVcmwiLCJhcHBOYW1lIiwic2VuZCIsImNoYW5uZWwiLCJlcnJvciIsInR5cGUiLCJkYXRhIiwidGltZSIsInRleHQiLCJmaWVsZHMiLCJBcHBsaWNhdGlvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJEYXRhIiwiYnVpbGRLaWJhbmFVcmwiLCJ1cmwiLCJkYXRlRnJvbSIsInN1YnRyYWN0IiwiZm9ybWF0IiwiZGF0ZVRvIiwiYWRkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxVQUFOLENBQWlCO0FBQ2ZDLGNBQVlDLE1BQVosRUFBb0I7QUFDbEIsU0FBS0MsUUFBTCxHQUFnQkQsT0FBT0MsUUFBdkI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLDJCQUFNLEtBQUtELFFBQVgsQ0FBbkI7QUFDQSxTQUFLRSxTQUFMLEdBQWlCSCxPQUFPRyxTQUF4QjtBQUNBLFNBQUtDLE9BQUwsR0FBZUosT0FBT0ksT0FBdEI7QUFDRDs7QUFFREMsYUFBMkM7QUFBQSxRQUFwQ0MsT0FBb0MsUUFBcENBLE9BQW9DO0FBQUEsUUFBM0JDLEtBQTJCLFFBQTNCQSxLQUEyQjtBQUFBLFFBQXBCQyxJQUFvQixRQUFwQkEsSUFBb0I7QUFBQSxRQUFkQyxJQUFjLFFBQWRBLElBQWM7QUFBQSxRQUFSQyxJQUFRLFFBQVJBLElBQVE7O0FBQ3pDLFNBQUtSLFdBQUwsQ0FBaUJHLElBQWpCLENBQXNCO0FBQ3BCQyxlQUFTQSxPQURXO0FBRXBCSyxZQUNFSCxTQUFTLE9BQVQsR0FDSywwQkFETCxHQUVLLG9DQUxhO0FBTXBCSSxjQUFRO0FBQ05DLHFCQUFhLEtBQUtULE9BRFo7QUFFTix5QkFBaUJVLEtBQUtDLFNBQUwsQ0FBZVIsS0FBZixDQUZYO0FBR05TLGNBQU1GLEtBQUtDLFNBQUwsQ0FBZU4sSUFBZixDQUhBO0FBSU4saURBQXlDLEtBQUtRLGNBQUwsQ0FDdkMsS0FBS2QsU0FEa0MsRUFFdkMsc0JBQU9PLElBQVAsQ0FGdUM7QUFKbkM7QUFOWSxLQUF0QjtBQWdCRDs7QUFFRE8saUJBQWVDLEdBQWYsRUFBb0JSLElBQXBCLEVBQTBCO0FBQ3hCLFVBQU1TLFdBQVdULEtBQUtVLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFFBQWpCLEVBQTJCQyxNQUEzQixFQUFqQjtBQUNBLFVBQU1DLFNBQVNaLEtBQUthLEdBQUwsQ0FBUyxDQUFULEVBQVksUUFBWixFQUFzQkYsTUFBdEIsRUFBZjs7QUFFQSxXQUFRLEdBQUVILEdBQUksNEVBQTJFQyxRQUFTLHFCQUFvQkcsTUFBTyxxSEFDM0gsS0FBS2xCLE9BQ04sbUNBQ0MsS0FBS0EsT0FDTixvR0FKRDtBQUtEO0FBcENjOztrQkF1Q0ZOLFUiLCJmaWxlIjoiYWxlcnRTbGFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzbGFjayBmcm9tIFwic2xhY2stbm90aWZ5XCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcblxuY2xhc3MgQWxlcnRTbGFjayB7XG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgIHRoaXMuc2xhY2tVcmwgPSBwYXJhbXMuc2xhY2tVcmw7XG4gICAgdGhpcy5zbGFja0NsaWVudCA9IHNsYWNrKHRoaXMuc2xhY2tVcmwpO1xuICAgIHRoaXMua2liYW5hVXJsID0gcGFyYW1zLmtpYmFuYVVybDtcbiAgICB0aGlzLmFwcE5hbWUgPSBwYXJhbXMuYXBwTmFtZTtcbiAgfVxuXG4gIHNlbmQoeyBjaGFubmVsLCBlcnJvciwgdHlwZSwgZGF0YSwgdGltZSB9KSB7XG4gICAgdGhpcy5zbGFja0NsaWVudC5zZW5kKHtcbiAgICAgIGNoYW5uZWw6IGNoYW5uZWwsXG4gICAgICB0ZXh0OlxuICAgICAgICB0eXBlID09PSBcImVycm9yXCJcbiAgICAgICAgICA/IGA6d2FybmluZzogRXJyb3IgSGFwcGVuZWRgXG4gICAgICAgICAgOiBgOmZpcmU6IFVuY2F1Z2h0IEV4Y2VwdGlvbiBIYXBwZW5lZGAsXG4gICAgICBmaWVsZHM6IHtcbiAgICAgICAgQXBwbGljYXRpb246IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgXCJFcnJvciBNZXNzYWdlXCI6IEpTT04uc3RyaW5naWZ5KGVycm9yKSxcbiAgICAgICAgRGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgIFwiOmNoYXJ0X3dpdGhfdXB3YXJkc190cmVuZDogS2liYW5hIFVybFwiOiB0aGlzLmJ1aWxkS2liYW5hVXJsKFxuICAgICAgICAgIHRoaXMua2liYW5hVXJsLFxuICAgICAgICAgIG1vbWVudCh0aW1lKVxuICAgICAgICApXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBidWlsZEtpYmFuYVVybCh1cmwsIHRpbWUpIHtcbiAgICBjb25zdCBkYXRlRnJvbSA9IHRpbWUuc3VidHJhY3QoMSwgXCJtaW51dGVcIikuZm9ybWF0KCk7XG4gICAgY29uc3QgZGF0ZVRvID0gdGltZS5hZGQoMSwgXCJtaW51dGVcIikuZm9ybWF0KCk7XG5cbiAgICByZXR1cm4gYCR7dXJsfSMvZGlzY292ZXI/X2c9KHJlZnJlc2hJbnRlcnZhbDooZGlzcGxheTpPZmYscGF1c2U6IWYsdmFsdWU6MCksdGltZTooZnJvbToke2RhdGVGcm9tfSxtb2RlOmFic29sdXRlLHRvOiR7ZGF0ZVRvfSkpJl9hPShjb2x1bW5zOiEoX3NvdXJjZSksZmlsdGVyczohKCgnJHN0YXRlJzooc3RvcmU6YXBwU3RhdGUpLG1ldGE6KGFsaWFzOiFuLGRpc2FibGVkOiFmLG5lZ2F0ZTohZixwYXJhbXM6KHF1ZXJ5OiR7XG4gICAgICB0aGlzLmFwcE5hbWVcbiAgICB9LHR5cGU6cGhyYXNlKSx0eXBlOnBocmFzZSx2YWx1ZToke1xuICAgICAgdGhpcy5hcHBOYW1lXG4gICAgfSkpKSxpbnRlcnZhbDphdXRvLHF1ZXJ5OihsYW5ndWFnZTpsdWNlbmUscXVlcnk6J1VuaGFuZGxlZCUyMFJlamVjdGlvbicpLHNvcnQ6ISgnQHRpbWVzdGFtcCcsZGVzYykpYDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbGVydFNsYWNrO1xuIl19