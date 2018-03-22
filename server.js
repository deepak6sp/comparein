const path = require('path');
const express = require('express');
const bodyParser= require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();

const compiler = webpack(config);

require('./server/database');

const clientRouter = require('./server/routes/client');
const apiRouter = require('./server/routes/api');
const adminRouter = require('./server/routes/admin');

app.use(require('webpack-dev-middleware')(compiler));
app.use(require('webpack-hot-middleware')(compiler));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('images'))
app.use('/', clientRouter);

app.use('/api', apiRouter);
app.use('/admin', adminRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen('8080');
