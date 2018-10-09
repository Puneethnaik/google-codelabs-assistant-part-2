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
    }
    bridgeApi.getRecommendations(req.body.queryResult.parameters.color[0], callback)

    
})

app.listen(3000, function(req, res){
    console.log("We are connected");
});