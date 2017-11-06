import { Router } from 'express';
import { service, url } from './modules/service';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import { Strategy } from 'passport-steam';
import jwt from 'jsonwebtoken';
import request from 'request';

const app = Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new Strategy({
    returnURL: 'http://localhost:3001/api/auth/steam/return',
    realm: 'http://localhost:3001/',
    apiKey: '892710EB47CF61827B1F9ABDDF001D45'
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

app.use(passport.initialize());

app.get('/auth/steam',
  passport.authenticate('steam'),
  function(req, res) {
  // The request will be redirected to Steam for authentication, so
  // this function will not be called.
});

app.get('/auth/steam/return', 
function(req, res, next) {
  passport.authenticate('steam', function(err, user, info){ 
    var payload = {
      user: user.identifier
    };

    const token = jwt.sign(payload, "devil", {expiresIn : 60*60*24});

    res.redirect('http://localhost:3000/auth/' + token);
  })(req, res, next)
});

const users = [
  {
    id: 1,
    name: 'Tim'
  }, 
  {
    id: 2,
    name: 'Jack'
  }
]

app.all(url('/users'), 
  service({
    find(params) {
      return Promise.resolve({ users });
    },
    get(id, params) {
      return Promise.resolve(users[id - 1]);
    }
}));

module.exports = app;
