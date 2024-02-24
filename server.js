const express = require('express')
const path = require('path')

const port = 3000
const bodypasrser = require('body-parser');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
const router = require('./router');

const app = express()

app.set('view engine', 'ejs');

// loading the static files
app.use('/static', express.static(path.join(__dirname,'public')));

app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

app.use(bodypasrser.json());
app.use(bodypasrser.urlencoded(({extended:true})));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'uuidv4()',
    resave: false,
    saveUninitialized: true
}))

app.use('/route', router);

// home route
app.get('/', (req, res) => {
  res.render('base', {title: "Login System"});
})

app.listen(port, ()=> {
    console.log("Listening on server https://localhost:3000");
})