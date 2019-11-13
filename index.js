const Twitter = require('twitter');
const fs = require('fs');
const TwitterConfig = require('./twitter_config');
const base64Img = require('base64-img');
const client = new Twitter(TwitterConfig.config);
client.get('statuses/lookup?id=2331833072',  function(error, tweet, response) {
  console.log(tweet);
});
// tweet with normal text
client.post('statuses/update', {status: 'I am a normal text'},  function(error, tweet, response) {
  if(error) throw error;
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
// tweet with url
client.post('statuses/update', {status: 'Check Top-10 Amitabh Bachchan Movies list on hoblist\n@hoblist1 https://hoblist.com/list/Namithavenugopal/movies/amitabh-bachchan-movies-list'},  function(error, tweet, response) {
  if(error) throw error;
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
// tweet with youtube url
client.post('statuses/update', {status: 'Check Top-10 Amitabh Bachchan Movies list on hoblist\n@hoblist1 https://www.youtube.com/watch?v=XUqGc0UfMh8'},  function(error, tweet, response) {
  if(error) throw error;
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
// tweet with media(image)
var media = fs.readFileSync('image.jpg',{encoding: 'base64'});
client.post('media/upload', {media: media}, function(error, media, response) {
  if (!error) {
    var status = {
      status: 'I am a tweet with a image',
      media_ids: media.media_id_string // Pass the media id string
    }
    client.post('statuses/update', status, function(error, tweet, response) {
      if (!error) {
        console.log(tweet);
      }
    });
  }
});
// tweet with media(image - base64)
var media_data = fs.readFileSync('image.jpg',{encoding: 'base64'});
client.post('media/upload', {media_data: media_data}, function(error, media, response) {
  if (!error) {
    var status = {
      status: 'I am a tweet with a image',
      media_ids: media.media_id_string // Pass the media id string
    }
    client.post('statuses/update', status, function(error, tweet, response) {
      if (!error) {
        console.log(tweet);
      }
    });
  }
});
// tweet with media(image url)
base64Img.requestBase64('https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-ctbm2m1i84ciu99ltpe67hnmc5-20190831102903.Medi.jpeg', function(err, res, body) {
  let b64=body.substring(body.indexOf(",")+1);
  client.post('media/upload', {media_data: b64}, function(error, media, response) {
    if (!error) {
      var status = {
        status: 'I am a tweet with a image',
        media_ids: media.media_id_string // Pass the media id string
      }
      client.post('statuses/update', status, function(error, tweet, response) {
        if (!error) {
          console.log(tweet);
        }
      });
    }else{
      console.log(error);
    }
  });
});
