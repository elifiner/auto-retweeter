// cron scheduled at cron-job.org @ eli.finer+soft.discpline@gmail.com

const _ = require('lodash');
const express = require('express');
const twitter = require('./twitter.js');

const app = express();
const port = 3000;

app.get('/', async (req, res) =>  {
  if (req.query.token === process.env.URL_TOKEN) {
    await retweet_random(res);
  } else {
    res.status(403).send('Access denied');
  }
});

app.listen(port, () => {
  console.log(`Auto Retweeter Bot listening at http://localhost:${port}`);
});

async function retweet_random(res) {
  const min_favorites = 3;
  var favorites = await twitter.self_favorites();
  if (favorites.length < min_favorites) {
    res.status(400).send(`Not enough favorites (<${min_favorites})`);
    return;
  }
  var tweet = _.sample(favorites);
  try {
    await twitter.unretweet(tweet.id_str);
    await twitter.retweet(tweet.id_str);
  } catch (e) {
    res.status(500).send(e);
    return;
  };
  res.status(200).send('Retweeted: ' + tweet.text);
}
