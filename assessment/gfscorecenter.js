// Express initialization
var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());
app.set('title', 'nodeapp');


var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://<gfried04>:<rofllmao11>@linus.mongohq.com:10086/app15048466';
var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
  db = databaseConnection;
});

  

// Highscores function
app.get('/highscores.json', function(request,response,next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");	
  var condensed_sorted = [];
  var game_title_requested = request.query.game_title;
  db.collection('highscores', function(err, collection) {
    if(!err) {
      response.set('Content-Type', 'text/json');

      collection.find({"game_title":game_title_requested}).toArray(function(err, highscores) {
   	
      highscores.sort(function(first,second) {
   
       if (first["score"] < second["score"]) {
 	   return 1;
 	   }
 	 
 	  if (first["score"] == second["score"]) {
 	   return 0;
 	   }
 
 	   if (first["score"] > second["score"]) {
 	   return -1;
 	   } 
 });


for (i=0; i<10; i++) {
   if (highscores[i] != null) {
    condensed_sorted[i] = highscores[i];	
  }
}

response.send(condensed_sorted);
      
      });
    };
});
});


//Post (submit) function
app.post('/submit.json', function(request,response,next) {
response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
 
var game_title = request.body.game_title;
var username = request.body.username;
var score = parseInt(request.body.score);
var created_at = request.body.created_at;
var post = {"game_title":game_title, "username":username, "score": score, "created_at":created_at};
db.collection('highscores', function(err, collection) {
if (!err) {
collection.insert(post);
}
});
});


//print all high scores
app.get('/', function(request, response, next) {
db.collection('highscores', function(err, collection) {
if(err){
     response.send("Error in printing scores!")	
}
if(!err) {
    collection.find().toArray(function(err, highscores) {
 
      response.send(highscores);      	
      });
    };
});
});


app.get('/usersearch', function(request, response) {
response.send("<script>function newPage(){in=document.getElementById('input_form');window.location='http://aqueous-castle-7030.herokuapp.com/userfound?username='+ in.value;};</script><body><label>Input Username</label><input type='text' id='input_form'/><button onclick='newPage()'>Submit</button></body>");
});


app.get('/userfound', function(request, response) {
response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");	
var username_requested = request.query.username;

db.collection('highscores', function(err, collection) {
if(!err) {
response.set('Content-Type', 'text/json');
    collection.find({"username":username_requested}).toArray(function(err, highscores) {	
response.send(highscores);
      });
    };
});
});


app.listen(process.env.PORT || 3000);