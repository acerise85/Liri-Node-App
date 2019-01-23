//Portfoli Link: https://acerise85.github.io/Bootstrap-Portfolio/

require("dotenv").config();

//npm package requires
let fs = require("fs");
let axios = require("axios");
let moment = require("moment")

//Spotify API links to files and spotify constructor
const keys = require("./keys.js");
let Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

//global variables to take in user input 
const action = process.argv[3];
const programTorun = process.argv[2];

//Function Initializers
if (programTorun === "concert-this") {

    concertThis(action);

} else if (programTorun === "spotify-this-song") {

    spotifyThisSong(action);
} else if (programTorun === "movie-this") {

    movieThis(action);
} else if (programTorun === "do-what-it-says") {


    doWhatItSays();
} else {
    console.log("Check the program")
}

//Concert-This Function
function concertThis(artist = "cher") {

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {

            for (let i = 0; i < response.data.length; i++) {

                //Name of the venue
                console.log("Venue: " + response.data[i].venue.name);
                //Venue location
                console.log("Venue Location: " + response.data[i].venue.city)
                //Date of the Event (use moment to format this as "MM/DD/YYYY")
                console.log(moment(response.data[i].datetime).format('MM/DD/YYYY'));
                console.log("-----------------------------")

            }
        })
}

//Spotify-This-Song Function
function spotifyThisSong(song = "Ace of Base") {

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {

            return console.log('Error occurred: ' + err);
        }
        // Display Artist Name   
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        // Display Song Preview URL
        console.log("Preview URL: " + data.tracks.items[0].external_urls.spotify);
        // Disaplay Song Name
        console.log("Song Name: " + data.tracks.items[0].name);
        // Display Album Name
        console.log("Album: " + data.tracks.items[0].album.name);      
    });
}


//movie-this Function
function movieThis(movieName = "Mr. Nobody") {

    axios
        .get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {

            //    * Title of the movie.
            console.log("Title: " + response.data.Title);
            //    * Year the movie came out.
            console.log("Year of Release: " + response.data.Year);
            //    * IMDB Rating of the movie.
            console.log("IMBD Rating: " + response.data.Ratings[0].Value);
            //    * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            //    * Country where the movie was produced.
            console.log("Country of Release: " + response.data.Country);
            //    * Language of the movie.
            console.log("Language: " + response.data.Language);
            //    * Plot of the movie.
            console.log("Plot: " + response.data.Plot);
            //    * Actors in the movie.
            console.log("Actors: " + response.data.Actors);
        })
}

//do-what-it-says Function
function doWhatItSays() {

    fs.readFile("./random.txt", "utf-8", function (err, data) {

        var dataArray = data.split(",");

                if (dataArray[0] === "spotify-this-song") {
    
                spotifyThisSong(dataArray[1]);
    
            }
    })

}

