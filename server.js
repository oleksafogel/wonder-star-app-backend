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
      connectionString: process.env.DB_URL,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: 5432,
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
app.post('/imageurl', (req, res) => handleApiCall(req, res));

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})