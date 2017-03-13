import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import bodyParser from 'body-parser';
import uriUtil from 'mongodb-uri';
import mongoose from 'mongoose';
let jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
let userconfig = require('../src/config'); // get our config file
let User   = require('../src/models/user'); // get our mongoose model
let hash = require('password-hash');
let app = express();
let router = express.Router();

mongoose.Promise = global.Promise;

let mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/gif';
let mongooseUri = uriUtil.formatMongoose(mongodbUri);
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.connect(mongooseUri, options);
const Gif = require('../src/models/gif');
const gifRoutes = require('../src/routes/gifs');
const userRoutes = require('../src/routes/users');

app.set('superSecret', userconfig.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* eslint-disable no-console */

const port = 3000;
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.use('/', gifRoutes);
// app.use('/', userRoutes);

app.post('/newuser', function(req, res) {

  let newUser = new User({
    name: req.body.name,
    password: hash.generate(req.body.password),
    isadmin: false
  });


  newUser.save(function(err) {
    if (err) throw err;
    // res.redirect('/');
    // console.log('User saved successfully');
    res.json(newUser);
  });
});

app.post('/authenticate', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (!hash.verify(req.body.password, user.password)) {
      // if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        let token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          isadmin: user.isadmin,
          _id: user._id
        });
        console.log("successful auth");
      }

    }

  });
});

// TODO: route middleware to verify a token
app.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
