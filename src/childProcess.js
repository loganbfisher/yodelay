import AlertSlack from "./alertSlack";

const slack = ({ slackUrl, kibanaUrl, appName }) => {
  return new AlertSlack({ slackUrl, kibanaUrl, appName });
};

const sendMessage = async ({
  channel,
  error,
  type,
  data,
  time,
  slackUrl,
  kibanaUrl,
  appName
}) => {
  await slack({ slackUrl, kibanaUrl, appName }).send({
    channel,
    error,
    type,
    data,
    time
  });
};

process.on(
  "message",
  async ({
    channel,
    error,
    type,
    data,
    time,
    slackUrl,
    kibanaUrl,
    appName
  }) => {
    return sendMessage({
      channel,
      error,
      type,
      data,
      time,
      slackUrl,
      kibanaUrl,
      appName
    }).then(() => {
      process.send("Done sending message....");
    });
  }
);
