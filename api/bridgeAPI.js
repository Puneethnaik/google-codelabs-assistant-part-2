const express = require('express');
let {PythonShell} = require('python-shell')
const config = require('../config');
var getRecommendations = function(mood, callback){
    var options = {
        args:
        [
            mood
        ],
        pythonPath: config.data.pythonPath,
        scriptPath: config.data.scriptPath
    }    
    PythonShell.run('python_backend.py', options, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            callback(data);
        }
    })
}
module.exports = {
    'getRecommendations' : getRecommendations   
};