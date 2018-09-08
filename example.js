import Yodelay from "./src/index";

const logger = new Yodelay({
  slackUrl:
    "",
  level: "info",
  format: "simple",
  kibanaUrl: "http://localhost:5601/app/kibana",
  channel: "#kpi-exceptions",
  appName: "prod-test-service"
});

function farts() {
  logger.info("SHARTS", "toot");
  logger.error("FARTS", "shoot");

  logger.debug("DEBUG", "fart");
  //sharts();
}

function sharts() {
  toots();
}

function toots() {
  throw "sharts";
}

farts();
