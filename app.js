var express = require('express');
// var userList = require('./users'); 	// ezzel a json file tartalmat toltjuk be??
var app = express();
var fs = require('fs')

var bodyParser = require('body-parser');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public/js'));	
app.use(express.static('public/style'));
app.use(express.static('public/images'));

app.use(bodyParser.urlencoded({extended: true}));

// GET homepage
app.get('/', function(request, response) {
    response.render('index');
});

// app.get('/users', function(request,response) {
// 	response.json(userList);
// });

//GET all users
app.get('/users', function(request, response){

    fs.readFile('./users.json', function (error, data) { 
        if (error) {
            throw error;
        }
        var parsedData = JSON.parse(data);
        // console.log("This is the app.get(/users) request");
        response.render('users', {users: parsedData})
    })
})

app.get('/search', function(request,response){
    let inputKeys = request.query.input;
    // console.log(inputKeys)
    fs.readFile('./users.json', function(err, data){
        if (err) {
            throw err;
        } else {
            var parsedData = JSON.parse(data);
            // console.log(parsedData);
            for (let i= 0; i < parsedData.length; i++){

                if (parsedData[i].firstname.toLowerCase().indexOf(inputKeys) === 0 || parsedData[i].lastname.toLowerCase().indexOf(inputKeys) === 0){
                    response.send({output:parsedData[i]})
                }
            }
        }
    })
})

app.get('/input', function(request,response){
	let input = request.query.input.toLowerCase();
	// console.log(input);

	    fs.readFile('users.json', function (error, data) { 
        if (error) {
            throw error;
        }
        let parsedData = JSON.parse(data);
        // console.log(parsedData);

		let output = parsedData.find(function(element) {
        return element.firstname.toLowerCase() === input || element.lastname.toLowerCase() === input || element.firstname.toLowerCase() + ' ' + element.lastname.toLowerCase() === input;
        });
		// console.log(output)
        
        response.render('searchresult', {matchedUsers: output});
	});
});

app.get('/new', function(request, response) {
    response.render('new');
});

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

        // var newJson = JSON.stringify(parsedData)
        // console.log(newJson);
        console.log(parsedData)
    
      fs.writeFile('./users.json', JSON.stringify(parsedData), function(err){
        if (err){
            response.send('error: ' + err)
        }
      })
            response.redirect('/users') 
      })
})  

app.listen(3000, function() {
    console.log('User app listening on port 3000!')
})
