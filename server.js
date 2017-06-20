console.log('Starting server.js');
const express = require('express');
const hbs = require('hbs')
const fs = require('fs');

const port = process.env.PORT || 3000;
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

/*
app.use((req, res, next)=>{
    res.render('maintenance.hbs');
})
*/

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
    });
app.get('/projects', (req, res) => {
        res.render('projects.hbs',{
            pageTitle: 'Projects Page'
        });
    });

app.listen(port, ()=>{
    console.log(`server listening on port ${port}...`)
});