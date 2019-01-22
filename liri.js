require("dotenv").config();

var fs = require("fs");
var axios = require("axios");

const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

 
const action = process.argv[3];
const programTorun = process.argv[2];

if (programTorun === "concert-this"){

    concertThis(action);

}else if (programTorun === "spotify-this-song"){

    spotifyThisSong(action);
}else if (programTorun === "movie-this"){

    movieThis(action);
}else if (programTorun === "do-what-it-says"){


    doWhatItSays();
}else{
    console.log("Check the program")
}
//    * ``

function concertThis(artist = "cher"){

    axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response){
    

        for (let i = 0; i < response.data.length; i++){

                
            let vName = response.data[i].venue.name;
            
             console.log(JSON.stringify(vName, null, 2));
        }  
    })
}

function spotifyThisSong(song = "All the Small Things"){


    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
         console.log(data.tracks.items[0].artists[0].name); 
         console.log(data.tracks.items[0].external_urls.spotify);
         console.log(data.tracks.items[0].name);
         console.log(data.tracks.items[0].album.name);
    //   The song's name

    //   * A preview link of the song from Spotify
 
    //   * The album that the song is from
      });
}

function movieThis(movieName = "Mr. Nobody"){

    axios
    .get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
    .then(function(response){
    

       


    //    * Title of the movie.
        console.log(response.data.Title);
    //    * Year the movie came out.
        console.log(response.data.Year);
    //    * IMDB Rating of the movie.
    console.log(response.data.Ratings[0].Value);
    //    * Rotten Tomatoes Rating of the movie.
    // console.log(response.data);
    //    * Country where the movie was produced.
    //    * Language of the movie.
    //    * Plot of the movie.
    //    * Actors in the movie.
    })
}

function doWhatItSays(){

    fs.readFile("./random.txt", "utf-8", function(err, data){

        var dataArray = data.split(",");
        if (dataArray[0] === "spotify-this-song"){

            spotifyThisSong(dataArray[1]);
        }
        
    })
    
}

