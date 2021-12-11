const Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

async function tweet(status) {  
  return client.post('statuses/update', {status});
}

async function search(q) {
  return client.get('search/tweets', {q});
}

async function favorites() {
  return client.get('favorites/list', {count:200});
}

async function self_favorites() {
  var results = await favorites();
  return results.filter(v => v.user.screen_name == process.env.USERNAME);
}

async function retweet(id) {
  return client.post('statuses/retweet/' + id, {});
}

async function unretweet(id) {
  console.log(id);
  return client.post('statuses/unretweet/' + id, {});
}

module.exports = {
  tweet,
  search,
  favorites,
  self_favorites,
  retweet,
  unretweet,
};