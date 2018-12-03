var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path'); 
var bridgeApi = require('./api/bridgeAPI');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public/')));


app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.post("/favouriteColorIntent", function(req, res){
    console.log(req.body);
    var callback = function(data){
        var responseJson = {
            "payload": {
              "google": {
                "expectUserResponse": true,
                "richResponse": {
                  "items": [
                    {
                      "simpleResponse": {
                        "textToSpeech": data.join(' ')
                      }
                    }
                  ]
                }
              }
            }
        };
        console.log(JSON.stringify(responseJson));
        res.json(responseJson);
        console.log(res.header);
    }
    if(req.body.queryResult.parameters.mood != null){
      bridgeApi.getRecommendations(req.body.queryResult.parameters.mood, callback)
    }
    else if(req.body.queryResult.parameters.eventPrefered != null){
      var fetchEventPreferredDetails = function(eventPreferred){
        var jsonObject = {
          "hackathon": [
          {
            "name" : "Axis Bank AI challenge",
            
          },
          {
            "name" : "Reva University AOG challenge",
            
          },
          {
            "name" : "NMIT AI challenge",
             
          }],
          "movie": [{
            "name" : "Andhadhun"
          }],
          "cricket match" : [{
            "name" : "Ind vs WI"
          }],
          "drawing competition" : [{
            "name" : "frog drawing competition"
          }],
          "music" : [{
            "name" : "rap tutorial"
          }],
          "beauty parlour" : [{
            "name" : "pavithra world beauty saloon"
          }],
          "marathon" : [{
            "name" : "Run for India"
          }],
          "party" : [{
            "name" : "rich golf club party"
          }],
          "zoo" : [{
            "name" : "Mysore zoo"
          }],
          "social service" : [{
            "name" : "Ganesha NGO for good people"
          }],
          "yoga" : [{
            "name" : "Isha yoga camp"
          }],
          "kitty party" : [{
            "name" : "Reliance Jio party"
          }]
        }
        var process = function(data){
          var tring = 'Here are the list of events' + '\n'
          for(var i = 0 ; i < data.length; i++){
            var reply = (i + 1) + ". Name : " + data[i].name + "\n";
            tring += reply;
          }
          var responseJson = {
            "payload": {
              "google": {
                "expectUserResponse": true,
                "richResponse": {
                  "items": [
                    {
                      "simpleResponse": {
                        "textToSpeech": tring
                      }
                    }
                  ]
                }
              }
            }
        };
          res.json(responseJson);
        }
        process(jsonObject[eventPreferred]);
        
      }
      fetchEventPreferredDetails(req.body.queryResult.parameters.eventPrefered)
    }
    
})

app.get("/", function(req, res){
  res.end("Hello this is localhost");
})
app.listen(3000, function(req, res){
    console.log("We are connected");
});