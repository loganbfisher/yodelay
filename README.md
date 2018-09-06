## Yodelay

Yodelay was made to combine the ability of logging and alerting to slack. The Winston logger adds a transport for uncaught exceptions so that we can notify slack with the error as it happens in the code. I also would like to extend the ability to alert for other cases possibly but for now this will do.

### Example

```
import Yodelay from "yodelay";

const logger = new Yodelay({
  slackUrl: process.env.SLACK_URL,
  level: process.env.LOG_LEVEL,
  format: process.env.LOG_FORMAT,
  channel: "#exceptions"
}).initialize();

logger.info('This is an info log...');
logger.error('This is an info log...');
logger.debug('This is an info log...');
```

| Param    | Description           | Type   | Required | Options                  | Default |
| -------- | --------------------- | ------ | -------- | ------------------------ | ------- |
| slackUrl | Webhook url for Slack | String | true     |                          |         |
| level    | Log level             | String | true     | (inherited from winston) | info    |
| format   | Log format            | String | true     | simple, json             | simple  |
| channel  | Slack channel         | String | true     |                          |         |
