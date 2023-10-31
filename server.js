import express, { json } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import { handleImageSubmit, handleApiCall } from './controllers/image.js';

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
app.post('/imageurl', (req, res) => handleApiCall(req, res)); // because it's not a higher-order function, it wouldn't be designed to receive res and req with the similar syntaxis to the endpoints above

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})