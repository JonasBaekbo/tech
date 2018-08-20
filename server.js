// load the things we need
var express = require('express');
var app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require("body-parser");
var multer = require('multer');

const port = process.env.PORT || 3000;

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'Fiskemad med kage er godt',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5 * 60 * 1000 } // 5 minutter
}));
require('./routes/index')(app);
require('./routes/login')(app);
require('./routes/admin')(app);

app.listen(port);
console.log(`Express server started http://localhost:${port}/`);