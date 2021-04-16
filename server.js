if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
//body-parser is deprecated
// const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Bringing in Routes from route folder
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

//set view engine
app.set('view engine', 'ejs');
//where views are coming from
app.set('views', __dirname + '/views');
//set express layouts-in a layouts folder on a file called layout
app.set('layout', 'layouts/layout');
//Use express layouts
app.use(expressLayouts);
app.use(methodOverride('_method'));
//where are public files will be
app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false })); deprecated dont use
app.use(express.urlencoded({ limit: '10mb', extended: false }));

//Set up mongoose
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

//setting deployed and development port
app.listen(process.env.PORT || 3000);
