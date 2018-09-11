## Yodelay

Yodelay was made to combine the ability of logging and shipping uncaught exceptions and error metrics off via api request in a simple json structure. I am using this for gathering and alerting errors and uncaught errors in our applications and shipping them off to a microservice that builds out metrics for prometheus to scrape.

Out of the box it is set to format your logs with either `simple` or `json` formatting. You can also select what log level you would like to use. The `simple` format adds prettyness to your logs while both `simple` and `json` adds a couple more fields that are helpful for log aggregators like kibana or loggly.

### Metrics Message Format

`{ metricAppName: 'test-app', errorType: 'uncaught_exception', message: 'Something bad happened on line...' }`

### Example

```
import Yodelay from "yodelay";

const logger = new Yodelay({
metricsEndpoint: 'https://example.example.com/metrics',
appName: "prod-example-api",
level: process.env.LOG_LEVEL,
format: process.env.LOG_FORMAT
});

logger.info('This is an info log...');
logger.error('This is an info log...');
logger.debug('This is an info log...');
```

| Param           | Description                      | Type   | Required | Options                  | Example | Default |
| --------------- | -------------------------------- | ------ | -------- | ------------------------ | ------- | ------- |
| metricsEndpoint | Api url or your metrics scraper  | String | true     |                          |         |         |
| level           | Log level                        | String | true     | (inherited from winston) |         | info    |
| format          | Log format                       | String | true     | simple, json             |         | simple  |
| appName         | Name of application your logging | String | true     |                          |         |         |  |  | true |
