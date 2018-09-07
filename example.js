import Yodelay from "./src/index";

const logger = new Yodelay({
  slackUrl: "https://test",
  level: "info",
  format: "json",
  kibanaUrl: "http://localhost:5601/app/kibana",
  channel: "#kpi-exceptions",
  appName: "prod-test-service"
}).initialize();

function farts() {
  sharts();
}

function sharts() {
  toots();
}

function toots() {
  throw "sharts";
}

farts();
