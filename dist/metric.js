"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Metric {
  constructor(params) {
    this.apiUrl = params.apiUrl;
    this.appName = params.appName;
  }

  async send(message, errorType) {
    await (0, _requestPromiseNative2.default)({
      method: "POST",
      uri: this.apiUrl,
      body: {
        metricAppName: this.appName,
        errorType: errorType,
        message: message
      },
      json: true
    });
  }
}

exports.default = Metric;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRyaWMuanMiXSwibmFtZXMiOlsiTWV0cmljIiwiY29uc3RydWN0b3IiLCJwYXJhbXMiLCJhcGlVcmwiLCJhcHBOYW1lIiwic2VuZCIsIm1lc3NhZ2UiLCJlcnJvclR5cGUiLCJtZXRob2QiLCJ1cmkiLCJib2R5IiwibWV0cmljQXBwTmFtZSIsImpzb24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxNQUFNQSxNQUFOLENBQWE7QUFDWEMsY0FBWUMsTUFBWixFQUFvQjtBQUNsQixTQUFLQyxNQUFMLEdBQWNELE9BQU9DLE1BQXJCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlRixPQUFPRSxPQUF0QjtBQUNEOztBQUVELFFBQU1DLElBQU4sQ0FBV0MsT0FBWCxFQUFvQkMsU0FBcEIsRUFBK0I7QUFDN0IsVUFBTSxvQ0FBUTtBQUNaQyxjQUFRLE1BREk7QUFFWkMsV0FBSyxLQUFLTixNQUZFO0FBR1pPLFlBQU07QUFDSkMsdUJBQWUsS0FBS1AsT0FEaEI7QUFFSkcsbUJBQVdBLFNBRlA7QUFHSkQsaUJBQVNBO0FBSEwsT0FITTtBQVFaTSxZQUFNO0FBUk0sS0FBUixDQUFOO0FBVUQ7QUFqQlU7O2tCQW9CRVosTSIsImZpbGUiOiJtZXRyaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tIFwicmVxdWVzdC1wcm9taXNlLW5hdGl2ZVwiO1xuXG5jbGFzcyBNZXRyaWMge1xuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICB0aGlzLmFwaVVybCA9IHBhcmFtcy5hcGlVcmw7XG4gICAgdGhpcy5hcHBOYW1lID0gcGFyYW1zLmFwcE5hbWU7XG4gIH1cblxuICBhc3luYyBzZW5kKG1lc3NhZ2UsIGVycm9yVHlwZSkge1xuICAgIGF3YWl0IHJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVyaTogdGhpcy5hcGlVcmwsXG4gICAgICBib2R5OiB7XG4gICAgICAgIG1ldHJpY0FwcE5hbWU6IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgZXJyb3JUeXBlOiBlcnJvclR5cGUsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgIH0sXG4gICAgICBqc29uOiB0cnVlXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWV0cmljO1xuIl19