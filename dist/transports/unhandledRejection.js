"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unhandledError = require("unhandled-error");

var _unhandledError2 = _interopRequireDefault(_unhandledError);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnhandledRejectionTransport {
  constructor(opts) {
    this.logger = opts.logger;
    this.appName = opts.appName;
    this.metric = opts.metric;
  }

  initialize() {
    var _this = this;

    (0, _unhandledError2.default)(function (error, context) {
      const errorType = context.hasOwnProperty("promise") ? "unhandled_promise_rejection" : "error";

      const message = {
        app: _this.appName,
        message: error.message,
        level: "error",
        timestamp: (0, _moment2.default)().format()
      };

      _this.logger.log(message);
      _this.metric.send(message, errorType);
    });
  }
}

exports.default = UnhandledRejectionTransport;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnRzL3VuaGFuZGxlZFJlamVjdGlvbi5qcyJdLCJuYW1lcyI6WyJVbmhhbmRsZWRSZWplY3Rpb25UcmFuc3BvcnQiLCJjb25zdHJ1Y3RvciIsIm9wdHMiLCJsb2dnZXIiLCJhcHBOYW1lIiwibWV0cmljIiwiaW5pdGlhbGl6ZSIsImVycm9yIiwiY29udGV4dCIsImVycm9yVHlwZSIsImhhc093blByb3BlcnR5IiwibWVzc2FnZSIsImFwcCIsImxldmVsIiwidGltZXN0YW1wIiwiZm9ybWF0IiwibG9nIiwic2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsMkJBQU4sQ0FBa0M7QUFDaENDLGNBQVlDLElBQVosRUFBa0I7QUFDaEIsU0FBS0MsTUFBTCxHQUFjRCxLQUFLQyxNQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZUYsS0FBS0UsT0FBcEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNILEtBQUtHLE1BQW5CO0FBQ0Q7O0FBRURDLGVBQWE7QUFBQTs7QUFDWCxrQ0FBZSxVQUFDQyxLQUFELEVBQVFDLE9BQVIsRUFBb0I7QUFDakMsWUFBTUMsWUFBWUQsUUFBUUUsY0FBUixDQUF1QixTQUF2QixJQUNkLDZCQURjLEdBRWQsT0FGSjs7QUFJQSxZQUFNQyxVQUFVO0FBQ2RDLGFBQUssTUFBS1IsT0FESTtBQUVkTyxpQkFBU0osTUFBTUksT0FGRDtBQUdkRSxlQUFPLE9BSE87QUFJZEMsbUJBQVcsd0JBQVNDLE1BQVQ7QUFKRyxPQUFoQjs7QUFPQSxZQUFLWixNQUFMLENBQVlhLEdBQVosQ0FBZ0JMLE9BQWhCO0FBQ0EsWUFBS04sTUFBTCxDQUFZWSxJQUFaLENBQWlCTixPQUFqQixFQUEwQkYsU0FBMUI7QUFDRCxLQWREO0FBZUQ7QUF2QitCOztrQkEwQm5CVCwyQiIsImZpbGUiOiJ1bmhhbmRsZWRSZWplY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdW5oYW5kbGVkRXJyb3IgZnJvbSBcInVuaGFuZGxlZC1lcnJvclwiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5cbmNsYXNzIFVuaGFuZGxlZFJlamVjdGlvblRyYW5zcG9ydCB7XG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdHMubG9nZ2VyO1xuICAgIHRoaXMuYXBwTmFtZSA9IG9wdHMuYXBwTmFtZTtcbiAgICB0aGlzLm1ldHJpYyA9IG9wdHMubWV0cmljO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB1bmhhbmRsZWRFcnJvcigoZXJyb3IsIGNvbnRleHQpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yVHlwZSA9IGNvbnRleHQuaGFzT3duUHJvcGVydHkoXCJwcm9taXNlXCIpXG4gICAgICAgID8gXCJ1bmhhbmRsZWRfcHJvbWlzZV9yZWplY3Rpb25cIlxuICAgICAgICA6IFwiZXJyb3JcIjtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICAgIHRpbWVzdGFtcDogbW9tZW50KCkuZm9ybWF0KClcbiAgICAgIH07XG5cbiAgICAgIHRoaXMubG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgIHRoaXMubWV0cmljLnNlbmQobWVzc2FnZSwgZXJyb3JUeXBlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVbmhhbmRsZWRSZWplY3Rpb25UcmFuc3BvcnQ7XG4iXX0=