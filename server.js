console.log('Starting server.js');
const express = require('express');
const hbs = require('hbs')
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (messageText)=>{
    return "messageText".toUpperCase();
});

app.set('view-engine', 'hbs')
app.use(express.static(__dirname+'/public'))

app.use((req, res, next)=>{
    var now = new Date().toDateString();
    var log = `${now}: ${req.method}, ${req.url}`;
    console.log(log)
    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err){
        console.log('Unable to append to server.log'+err);
        }
    })
    next();
})

app.use((req, res, next)=>{
    res.render('maintenance.hbs');
})

app.get('/', (req, res) => {
        res.render('home.hbs', {
            pageTitle: 'Home Page',
            welcomeMessage: 'Welcome to my website'
        });
    })

app.get('/about', (req, res) => {
        res.render('about.hbs',{
            pageTitle: 'About Page'
        });
    })


app.listen(3000, ()=>{
    console.log("server listening on port 3000...")
});