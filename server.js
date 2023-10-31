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
      connectionString: 'postgres://wonder_star_app_db_user:3TtW54hvTmvc1lxTtYG1FL3sD68lG7fe@dpg-cl0ebsa37rbc739m6b00-a/wonder_star_app_db',
      // ssl: { rejectUnauthorized: false },
      host: 'dpg-cl0ebsa37rbc739m6b00-a',
      user : 'wonder_star_app_db_user',
      password : '3TtW54hvTmvc1lxTtYG1FL3sD68lG7fe',
      database : 'wonder_star_app_db',
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