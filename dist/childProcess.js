"use strict";

var _alertSlack = require("./alertSlack");

var _alertSlack2 = _interopRequireDefault(_alertSlack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const slack = function (_ref) {
  let slackUrl = _ref.slackUrl,
      kibanaUrl = _ref.kibanaUrl,
      appName = _ref.appName;

  return new _alertSlack2.default({ slackUrl, kibanaUrl, appName });
};

const sendMessage = async function (_ref2) {
  let channel = _ref2.channel,
      error = _ref2.error,
      type = _ref2.type,
      data = _ref2.data,
      time = _ref2.time,
      slackUrl = _ref2.slackUrl,
      kibanaUrl = _ref2.kibanaUrl,
      appName = _ref2.appName;

  await slack({ slackUrl, kibanaUrl, appName }).send({
    channel,
    error,
    type,
    data,
    time
  });
};

process.on("message", async function (_ref3) {
  let channel = _ref3.channel,
      error = _ref3.error,
      type = _ref3.type,
      data = _ref3.data,
      time = _ref3.time,
      slackUrl = _ref3.slackUrl,
      kibanaUrl = _ref3.kibanaUrl,
      appName = _ref3.appName;

  return sendMessage({
    channel,
    error,
    type,
    data,
    time,
    slackUrl,
    kibanaUrl,
    appName
  }).then(function () {
    process.send("Done sending message....");
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGlsZFByb2Nlc3MuanMiXSwibmFtZXMiOlsic2xhY2siLCJzbGFja1VybCIsImtpYmFuYVVybCIsImFwcE5hbWUiLCJBbGVydFNsYWNrIiwic2VuZE1lc3NhZ2UiLCJjaGFubmVsIiwiZXJyb3IiLCJ0eXBlIiwiZGF0YSIsInRpbWUiLCJzZW5kIiwicHJvY2VzcyIsIm9uIiwidGhlbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUEsTUFBTUEsUUFBUSxnQkFBc0M7QUFBQSxNQUFuQ0MsUUFBbUMsUUFBbkNBLFFBQW1DO0FBQUEsTUFBekJDLFNBQXlCLFFBQXpCQSxTQUF5QjtBQUFBLE1BQWRDLE9BQWMsUUFBZEEsT0FBYzs7QUFDbEQsU0FBTyxJQUFJQyxvQkFBSixDQUFlLEVBQUVILFFBQUYsRUFBWUMsU0FBWixFQUF1QkMsT0FBdkIsRUFBZixDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxNQUFNRSxjQUFjLHVCQVNkO0FBQUEsTUFSSkMsT0FRSSxTQVJKQSxPQVFJO0FBQUEsTUFQSkMsS0FPSSxTQVBKQSxLQU9JO0FBQUEsTUFOSkMsSUFNSSxTQU5KQSxJQU1JO0FBQUEsTUFMSkMsSUFLSSxTQUxKQSxJQUtJO0FBQUEsTUFKSkMsSUFJSSxTQUpKQSxJQUlJO0FBQUEsTUFISlQsUUFHSSxTQUhKQSxRQUdJO0FBQUEsTUFGSkMsU0FFSSxTQUZKQSxTQUVJO0FBQUEsTUFESkMsT0FDSSxTQURKQSxPQUNJOztBQUNKLFFBQU1ILE1BQU0sRUFBRUMsUUFBRixFQUFZQyxTQUFaLEVBQXVCQyxPQUF2QixFQUFOLEVBQXdDUSxJQUF4QyxDQUE2QztBQUNqREwsV0FEaUQ7QUFFakRDLFNBRmlEO0FBR2pEQyxRQUhpRDtBQUlqREMsUUFKaUQ7QUFLakRDO0FBTGlELEdBQTdDLENBQU47QUFPRCxDQWpCRDs7QUFtQkFFLFFBQVFDLEVBQVIsQ0FDRSxTQURGLEVBRUUsdUJBU007QUFBQSxNQVJKUCxPQVFJLFNBUkpBLE9BUUk7QUFBQSxNQVBKQyxLQU9JLFNBUEpBLEtBT0k7QUFBQSxNQU5KQyxJQU1JLFNBTkpBLElBTUk7QUFBQSxNQUxKQyxJQUtJLFNBTEpBLElBS0k7QUFBQSxNQUpKQyxJQUlJLFNBSkpBLElBSUk7QUFBQSxNQUhKVCxRQUdJLFNBSEpBLFFBR0k7QUFBQSxNQUZKQyxTQUVJLFNBRkpBLFNBRUk7QUFBQSxNQURKQyxPQUNJLFNBREpBLE9BQ0k7O0FBQ0osU0FBT0UsWUFBWTtBQUNqQkMsV0FEaUI7QUFFakJDLFNBRmlCO0FBR2pCQyxRQUhpQjtBQUlqQkMsUUFKaUI7QUFLakJDLFFBTGlCO0FBTWpCVCxZQU5pQjtBQU9qQkMsYUFQaUI7QUFRakJDO0FBUmlCLEdBQVosRUFTSlcsSUFUSSxDQVNDLFlBQU07QUFDWkYsWUFBUUQsSUFBUixDQUFhLDBCQUFiO0FBQ0QsR0FYTSxDQUFQO0FBWUQsQ0F4QkgiLCJmaWxlIjoiY2hpbGRQcm9jZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFsZXJ0U2xhY2sgZnJvbSBcIi4vYWxlcnRTbGFja1wiO1xuXG5jb25zdCBzbGFjayA9ICh7IHNsYWNrVXJsLCBraWJhbmFVcmwsIGFwcE5hbWUgfSkgPT4ge1xuICByZXR1cm4gbmV3IEFsZXJ0U2xhY2soeyBzbGFja1VybCwga2liYW5hVXJsLCBhcHBOYW1lIH0pO1xufTtcblxuY29uc3Qgc2VuZE1lc3NhZ2UgPSBhc3luYyAoe1xuICBjaGFubmVsLFxuICBlcnJvcixcbiAgdHlwZSxcbiAgZGF0YSxcbiAgdGltZSxcbiAgc2xhY2tVcmwsXG4gIGtpYmFuYVVybCxcbiAgYXBwTmFtZVxufSkgPT4ge1xuICBhd2FpdCBzbGFjayh7IHNsYWNrVXJsLCBraWJhbmFVcmwsIGFwcE5hbWUgfSkuc2VuZCh7XG4gICAgY2hhbm5lbCxcbiAgICBlcnJvcixcbiAgICB0eXBlLFxuICAgIGRhdGEsXG4gICAgdGltZVxuICB9KTtcbn07XG5cbnByb2Nlc3Mub24oXG4gIFwibWVzc2FnZVwiLFxuICBhc3luYyAoe1xuICAgIGNoYW5uZWwsXG4gICAgZXJyb3IsXG4gICAgdHlwZSxcbiAgICBkYXRhLFxuICAgIHRpbWUsXG4gICAgc2xhY2tVcmwsXG4gICAga2liYW5hVXJsLFxuICAgIGFwcE5hbWVcbiAgfSkgPT4ge1xuICAgIHJldHVybiBzZW5kTWVzc2FnZSh7XG4gICAgICBjaGFubmVsLFxuICAgICAgZXJyb3IsXG4gICAgICB0eXBlLFxuICAgICAgZGF0YSxcbiAgICAgIHRpbWUsXG4gICAgICBzbGFja1VybCxcbiAgICAgIGtpYmFuYVVybCxcbiAgICAgIGFwcE5hbWVcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHByb2Nlc3Muc2VuZChcIkRvbmUgc2VuZGluZyBtZXNzYWdlLi4uLlwiKTtcbiAgICB9KTtcbiAgfVxuKTtcbiJdfQ==