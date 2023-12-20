require('dotenv').config();
const https = require("https");
const express = require("express");
const line = require('@line/bot-sdk');
const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.LINE_ACCESS_TOKEN;
const SECRET = process.env.SECRET;

const config = {
  channelSecret: SECRET,
  channelAccessToken: TOKEN,
};

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
    res.sendStatus(200);
});
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
     console.error(err);
      res.status(500).end();
    });
});

const client = new line.Client(config);

async function handleEvent(event) {
  console.log(req.body.event);
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'エコー' //実際に返信の言葉を入れる箇所
  });
}

console.log(`Server running at ${PORT}`);
