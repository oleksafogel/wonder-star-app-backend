import express, { json } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handleImageSubmit from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'wonder-star-app'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Success!');
})

app.post('/signin', handleSignIn(db, bcrypt));
app.post('/register', handleRegister(db, bcrypt));
app.get('/profile/:id', handleProfile(db));
app.put('/image', handleImageSubmit(db));

app.listen(3000, () => {
    console.log('app is running on port 3000');
})