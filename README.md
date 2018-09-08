## Yodelay

Yodelay was made to combine the ability of logging and alerting to slack. The Winston logger adds a transport for uncaught exceptions so that we can notify slack with the error as it happens in the code. I also would like to extend the ability to alert for other cases possibly but for now this will do.

## Out of the box

Out of the box it is set to format your logs with either `simple` or `json` formatting. You can also select what log level you would like to use. The `simple` format adds prettyness to your logs while both `simple` and `json` adds a couple more fields that are helpful for log aggregators like kibana or loggly.

Uncaught exceptions and errors are sent to your slack channel you specify. If you would like to turn off the functionality of sending alerts with regular `logger.error` messages make sure you set that option when initializing.

### Example

```
import Yodelay from "yodelay";

const logger = new Yodelay({
  appName: "prod-example-api",
  slackUrl: process.env.SLACK_URL,
  channel: "#exceptions",
  level: process.env.LOG_LEVEL,
  format: process.env.LOG_FORMAT,
  kibanaUrl: 'http://localhost:5601/app/kibana'
});

logger.info('This is an info log...');
logger.error('This is an info log...');
logger.debug('This is an info log...');
```

| Param        | Description                                   | Type    | Required | Options                  | Example                            | Default |
| ------------ | --------------------------------------------- | ------- | -------- | ------------------------ | ---------------------------------- | ------- |
| slackUrl     | Webhook url for Slack                         | String  | true     |                          |                                    |         |
| level        | Log level                                     | String  | true     | (inherited from winston) |                                    | info    |
| format       | Log format                                    | String  | true     | simple, json             |                                    | simple  |
| appName      | Name of application your logging              | String  | true     |                          |                                    |         |
| alertOnError | Send alerts for regular logger.error to slack | Boolean | false    |                          |                                    | true    |
| kibanaUrl    | Url of Kibana UI                              | String  | true     |                          | "http://localhost:5601/app/kibana" |         |
| channel      | Slack channel                                 | String  | true     |                          |                                    |         |
