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
      const errorType = context.hasOwnProperty("promise") ? "unhandled_promise_rejection" : "unhandled_error";

      const message = {
        app: _this.appName,
        message: error.message,
        level: "error",
        timestamp: (0, _moment2.default)().format()
      };

      _this.logger.log(message);
      _this.metric.send(message, errorType);
    }, { doNotCrash: true });
  }
}

exports.default = UnhandledRejectionTransport;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnRzL3VuaGFuZGxlZFJlamVjdGlvbi5qcyJdLCJuYW1lcyI6WyJVbmhhbmRsZWRSZWplY3Rpb25UcmFuc3BvcnQiLCJjb25zdHJ1Y3RvciIsIm9wdHMiLCJsb2dnZXIiLCJhcHBOYW1lIiwibWV0cmljIiwiaW5pdGlhbGl6ZSIsImVycm9yIiwiY29udGV4dCIsImVycm9yVHlwZSIsImhhc093blByb3BlcnR5IiwibWVzc2FnZSIsImFwcCIsImxldmVsIiwidGltZXN0YW1wIiwiZm9ybWF0IiwibG9nIiwic2VuZCIsImRvTm90Q3Jhc2giXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLDJCQUFOLENBQWtDO0FBQ2hDQyxjQUFZQyxJQUFaLEVBQWtCO0FBQ2hCLFNBQUtDLE1BQUwsR0FBY0QsS0FBS0MsTUFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWVGLEtBQUtFLE9BQXBCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSCxLQUFLRyxNQUFuQjtBQUNEOztBQUVEQyxlQUFhO0FBQUE7O0FBQ1gsa0NBQ0UsVUFBQ0MsS0FBRCxFQUFRQyxPQUFSLEVBQW9CO0FBQ2xCLFlBQU1DLFlBQVlELFFBQVFFLGNBQVIsQ0FBdUIsU0FBdkIsSUFDZCw2QkFEYyxHQUVkLGlCQUZKOztBQUlBLFlBQU1DLFVBQVU7QUFDZEMsYUFBSyxNQUFLUixPQURJO0FBRWRPLGlCQUFTSixNQUFNSSxPQUZEO0FBR2RFLGVBQU8sT0FITztBQUlkQyxtQkFBVyx3QkFBU0MsTUFBVDtBQUpHLE9BQWhCOztBQU9BLFlBQUtaLE1BQUwsQ0FBWWEsR0FBWixDQUFnQkwsT0FBaEI7QUFDQSxZQUFLTixNQUFMLENBQVlZLElBQVosQ0FBaUJOLE9BQWpCLEVBQTBCRixTQUExQjtBQUNELEtBZkgsRUFnQkUsRUFBRVMsWUFBWSxJQUFkLEVBaEJGO0FBa0JEO0FBMUIrQjs7a0JBNkJuQmxCLDJCIiwiZmlsZSI6InVuaGFuZGxlZFJlamVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1bmhhbmRsZWRFcnJvciBmcm9tIFwidW5oYW5kbGVkLWVycm9yXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcblxuY2xhc3MgVW5oYW5kbGVkUmVqZWN0aW9uVHJhbnNwb3J0IHtcbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0cy5sb2dnZXI7XG4gICAgdGhpcy5hcHBOYW1lID0gb3B0cy5hcHBOYW1lO1xuICAgIHRoaXMubWV0cmljID0gb3B0cy5tZXRyaWM7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHVuaGFuZGxlZEVycm9yKFxuICAgICAgKGVycm9yLCBjb250ZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IGVycm9yVHlwZSA9IGNvbnRleHQuaGFzT3duUHJvcGVydHkoXCJwcm9taXNlXCIpXG4gICAgICAgICAgPyBcInVuaGFuZGxlZF9wcm9taXNlX3JlamVjdGlvblwiXG4gICAgICAgICAgOiBcInVuaGFuZGxlZF9lcnJvclwiO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgICAgIHRpbWVzdGFtcDogbW9tZW50KCkuZm9ybWF0KClcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubWV0cmljLnNlbmQobWVzc2FnZSwgZXJyb3JUeXBlKTtcbiAgICAgIH0sXG4gICAgICB7IGRvTm90Q3Jhc2g6IHRydWUgfVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5oYW5kbGVkUmVqZWN0aW9uVHJhbnNwb3J0O1xuIl19