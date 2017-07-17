// jansrandomuser
// author moja
// Shift Alt F(ormat)
var express = require('express');
var app = express();
var http = require('http');
var https = require('https');

//++++++++++++ get 5 random users from http://randomuser.me/api ++++++++++++++++
//https://randomuser.me/api/?results=5

var unknownPerson = {};
unknownPerson.firstname = 'John';
unknownPerson.lastname = 'Doe';

var randomPerson = "";  //make sure it's a string
var randomPersons = "";

var simplePerson = {};

//https://nodejs.org/api/http.html#http_http_get_options_callback
//https://davidwalsh.name/nodejs-http-request
//https://stackoverflow.com/questions/11826384/calling-a-json-api-with-node-js


// http.get('http://randomuser.me/api', (res) => {
//     const { uhh } = res;

// });

//https://nodejs.org/docs/v0.4.10/api/http.html#http.request


https.get('https://randomuser.me/api/', function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        randomPerson += chunk;
    });

    res.on('end', function () {
        console.log('end');
         console.log('createSimplePerson');
        //  createSimplePerson();
        // createSimplePerson(JSON.parse(randomPerson));
        simplePerson = createSimplePerson(JSON.parse(randomPerson));
    })
}).on('error', function (e) {
    console.log('problem with request: ' + e.message);
});

// creeert een simplePerson object obv randomPerson; 
// met slechts: vnaam, anaam, email, thumbnail
function createSimplePerson(tempPerson){
    // let tempPerson = JSON.parse(randomPerson);
    let simplePerson = {};
    simplePerson.firstname = tempPerson.results[0].name.first;
    simplePerson.lastname=tempPerson.results[0].name.last;
    simplePerson.email=tempPerson.results[0].email;
    simplePerson.thumbnail=tempPerson.results[0].picture.thumbnail;
    return simplePerson;
}


https.get('https://randomuser.me/api/?results=5', function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        randomPersons += chunk;
    });

    res.on('end', function () {
        console.log('test');
    })
}).on('error', function (e) {
    console.log('problem with request: ' + e.message);
    //response.send(jsonObject);
})

app.get('/randomperson', function (request, response) {
    // console.log('typeof text ', typeof randomperson);
    // console.log('typeof JSON ', typeof (JSON.parse(randomperson)));
    
     response.send(JSON.parse(randomPerson));
    //  response.send(randomPerson);
})

app.get('/randompersons', function (request, response) {
    // console.log('typeof text ', typeof randomperson);
    // console.log('typeof JSON ', typeof (JSON.parse(randomperson)));
    
     response.send(JSON.parse(randomPersons));
    //  response.send(randomPerson);
})

app.get('/SimplePerson', function(request, response){
    console.log('getSimplePerson ');
    response.send(simplePerson);
})

app.get('/unknownperson', function (request, response) {
    response.send(unknownPerson);
})

//++++++++++++++get post methods++++++++++++++++

app.get('/', function (request, response) {
    response.send('Hello Avans!');
})

//only runs the first match
app.get('/', function (request, response) {
    response.send('Hello again Avans!');
})

app.get('/about', function (request, response) {
    response.send('about Avans!');
})

app.post('/', function (request, response) {
    response.send('Hello Avans, POST request received!');
})

app.put('/', function (request, response) {
    response.send('Hello Avans, PUT request received!');
})

app.get('/firstname/:firstname/lastname/:lastname', function (req, res) {
    res.send('Welkom ' + req.params.firstname + ' ' + req.params.lastname);
})

app.get('*', function (request, response) {
    response.status(404);
    response.send('404 - Not found');
})

//+++++++++++ start listening +++++++++++++++++++++
app.listen(3000, function () {
    console.log('Server app is listening on port 3000');
})

//++++++++++++++ error logging ++++++++++++++++++
process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    console.log('exitHandler output:');
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) {
        console.log('exit');
        process.exit();
    }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
