require("dotenv").config();
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var command = process.argv[2];
var searchQuery = process.argv[3];
var searchQuery2 = process.argv[4];
var searchQuery3 = process.argv[5];
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var movieSearch = "http://www.omdbapi.com/?apikey=trilogy&t=" + searchQuery;

function getTweets() {
  var params = {
    screen_name: 'clvlnd_pete'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      // var jsonTweets = JSON.parse(tweets);
      console.log(tweets[0].text);
      console.log(tweets[1].text);
      console.log(tweets[2].text);
    }
  });
}

function spotifySong() {
  spotify.search({
    type: 'track',
    query: searchQuery
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var firstResult = data.tracks.items[0];
    // console.log(data.tracks.items[0]);
    console.log(firstResult.album.artists[0].name);
  });
}

function movieThis() {
  request(movieSearch, function (error, response, body) {
    var jsonMovieResponse = JSON.parse(body);
    let movieTitle = jsonMovieResponse.Title;
    console.log(jsonMovieResponse);
    console.log("Movie Title: " + movieTitle);
    console.log("Movie Year: " + jsonMovieResponse.Year);
    console.log("IMDB Rating: " + jsonMovieResponse.Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + jsonMovieResponse.Ratings[1].Value);
    console.log("Country Produced: " + jsonMovieResponse.Country);
    console.log("Country Produced: " + jsonMovieResponse.Language);
    console.log("Country Produced: " + jsonMovieResponse.Actors);
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
  });
}

switch (command) {
  case "my-tweets":
    getTweets();
    break;
  case "spotify-this-song":
    spotifySong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhat();
    break;
}