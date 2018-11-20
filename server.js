const express = require('express');
const hbs = require('hbs');
const app = express();  // creating application with express package..
const fs = require('fs');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials'); // used to access the common files
app.use(express.static(__dirname + '/public')); // used to access the html page in public folder directly..


app.use((req, res, next) => {           // this is express middleware that used to check the time and details when the clinet
                                      //sends the request and written for the futhure without calling next() the project will not run
  var now = new Date().toString();
  fs.appendFileSync('server.log', now +" " + req.method +" "+ req.url + "\n");
  next();
});

app.use((req, res, next) => {
  res.render('maintainence.hbs');

});

hbs.registerHelper('ch', () => {
  return 'help';
});

hbs.registerHelper('date', () => {
  return new Date().getDate();        // this data has been used in every file with help of {{date}}
});

hbs.registerHelper('temp', (msg) => {
  return msg+"sdf";
});



app.get('/', (req, res) => {
  res.render('first.hbs',{
    title:'first page',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    str:'string',
  });
});


app.listen(3000 , () => {
  console.log('server is ready');
});
