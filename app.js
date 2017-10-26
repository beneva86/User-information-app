var express = require('express');
var app = express();
var fs = require('fs')

var bodyParser = require('body-parser');



app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));

// GET homepage
app.get('/', function(request, response) {
	response.render('index');
});

//GET all users
app.get('/users', function(request, response){

    fs.readFile('./users.json', function (error, data) { // callback with (parameters)
        if (error) {
            throw error;
        }

        var parsedData = JSON.parse(data);
        console.log("This is the app.get(/users) request");
        response.render('./users', {users: parsedData})

	})
})

//GET search users
app.get('/search', function(request,response){
	var input = request.query.q;
	fs.readFile('./users.json', function (error, data) { // callback with (parameters)
        if (error) {
            throw error;
        }

        var parsedData = JSON.parse(data);
        console.log(parsedData);

		var output = parsedData.find(function(element) {
		return element.firstname.toLowerCase() === input || element.lastname.toLowerCase() === input; 
		});
		response.render('./search', {matchedUsers: output})
	});

	// var output = parsedData.find(element => element.firstname === input || element.lastname === input);
	
})

// GET new users
app.get('/new', function(request, response) {
	response.render('new');
});

// POST new users

app.post('/new', function(request,response){
	var firstName = request.body.firstname.toLowerCase();
	var lastName = request.body.lastname.toLowerCase();
	var email = request.body.email.toLowerCase();



	fs.readFile('./users.json', function (error, data) { // callback with (parameters)
        if (error) {
            throw error;
        }

        var parsedData = JSON.parse(data);
        var newUser = {
        	firstname: firstName,
        	lastname: lastName, 
        	email: email,
        }

        parsedData.push(newUser);

        var newJson = JSON.stringify(parsedData)
        // console.log(newJson);
        console.log(parsedData)

      
      fs.writeFile('./users.json', newJson, function(err){
      	if (err){
      		response.send('error: ' + err)
      	}

      })
        response.send('/users', {users: parsedData})
	
})
})	

app.listen(3000, function() {
    console.log('User app listening on port 3000!')
})
