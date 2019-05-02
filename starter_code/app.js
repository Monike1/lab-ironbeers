
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index', {title:'Home'});
});

app.get("/beers", (req, res) => {
  var beers = punkAPI.getBeers().then(beers => {
    console.log(JSON.stringify(beers, null, 2))
    res.render("beers", {beers: beers, title: "Beers"});
  })
  .catch(error => {
    console.log(error)
  })
  console.log(beers);
  
})

app.get("/random-beer", (req, res) => {

  punkAPI.getRandom().then(beers => {
    
    res.render("random-beer", {beers: beers, title: "Random Beer"});
  })
  .catch(error => {
    console.log(error)
  })
  
})

app.listen(3000, ()=> {
  console.log("listening on port 3000")
});
