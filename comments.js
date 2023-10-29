// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const port = 3000;

// Create route for comments
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Create post route for comments
app.post('/', (req, res) => {
    let apiKey = "f2e3a1b3e4e4a4f0e7e6e0b5a0d2e1c5";
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    request(url, (err, response, body) => {
        if(err){
            res.sendFile(__dirname + '/failure.html');
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.sendFile(__dirname + '/failure.html');
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.send(weatherText);
            }
        }
    });
});

// Create post route for failure
app.post('/failure', (req, res) => {
    res.redirect('/');
});

// Listen to port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
