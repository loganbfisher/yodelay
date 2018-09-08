import slack from "slack-notify";
import moment from "moment";

class AlertSlack {
  constructor(params) {
    this.slackUrl = params.slackUrl;
    this.slackClient = slack(this.slackUrl);
    this.kibanaUrl = params.kibanaUrl;
    this.appName = params.appName;
  }

  send({ channel, error, type, data, time }) {
    this.slackClient.send({
      channel: channel,
      text:
        type === "error"
          ? `:warning: Error Happened`
          : `:fire: Uncaught Exception Happened`,
      fields: {
        Application: this.appName,
        "Error Message": JSON.stringify(error),
        Data: JSON.stringify(data),
        ":chart_with_upwards_trend: Kibana Url": this.buildKibanaUrl(
          this.kibanaUrl,
          time
        )
      }
    });
  }

  buildKibanaUrl(url, time) {
    const dateFrom = time.subtract(1, "minute").format();
    const dateTo = time.add(1, "minute").format();

    return `${url}#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:${dateFrom},mode:absolute,to:${dateTo}))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,negate:!f,params:(query:${
      this.appName
    },type:phrase),type:phrase,value:${
      this.appName
    }))),interval:auto,query:(language:lucene,query:'Unhandled%20Rejection'),sort:!('@timestamp',desc))`;
  }
}

export default AlertSlack;
