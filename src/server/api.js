import { Router } from 'express';
import { service, url } from './modules/service';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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
