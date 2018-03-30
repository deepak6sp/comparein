const path = require('path');
const express = require('express');
const bodyParser= require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();

const compiler = webpack(config);

require('./server/database');

// const clientRouter = require('./server/routes/client');
// const adminRouter = require('./server/routes/admin');
const apiRouter = require('./server/routes/api');


app.use(require('webpack-dev-middleware')(compiler));
app.use(require('webpack-hot-middleware')(compiler));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('images'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// app.use('/', clientRouter);
// app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen('3000');
