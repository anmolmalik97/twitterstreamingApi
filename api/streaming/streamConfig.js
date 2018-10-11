const config = {};
const RevIndex = require('../../tweetSchema/tweetRevIndex.js')
const Tweet = require('../../tweetSchema/tweet.js')
const soundex = require('soundex-code')

const Twit = require('twit');

config.twitterStream = null;

config.T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

config.sendMsg = async (msg) => {
  console.log(msg)
  const TwitterData = new Tweet(msg); // create object 
    TwitterData.save()
    .then(data => {
      let dataArray = data.text.split(' ');
      dataArray.forEach(async (arrayData) => {
      await RevIndex.findOneAndUpdate({key: soundex(arrayData)},{$push: {tweetId: data._id}},{upsert: true,new: true,},(err,data) => {
      })
      })
    }) 
}

config.streamT = () => {
  const stream = config.T.stream('statuses/filter', { track: 'modi' })
  stream.on('tweet', (tweet) => {
           config.sendMsg(tweet);
        });

    stream.on('error', (error) => {
        console.log(error);
    });

    config.twitterStream = stream;
}

module.exports = config

 



