if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//set view engine
app.set('view engine', 'ejs');
//where views are coming from
app.set('views', __dirname + '/views');
//set express layouts-in a layouts folder on a file called layout
app.set('layout', 'layouts/layout');
//Use express layouts
app.use(expressLayouts);
//where are public files will be
app.use(express.static('public'));

//Set up mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

//setting deployed and development port
app.listen(process.env.PORT || 3000);
