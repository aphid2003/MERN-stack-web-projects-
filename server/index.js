require('dotenv').config(); // this enables us one to read what is in the .env file
const express = require('express');
const cors = require('cors'); //cors is a middleware that allows us to make requests from the frontend to the backend
const mongoose = require('mongoose');// mongoose is used in connecting to the mongodb database
const bcrypt = require('bcryptjs');// bcrypt is used for hashing passwords
const jwt = require('jsonwebtoken');//jason web token is used for authentication of users
const axios = require('axios');// axios is used to make requests to the news API

// i defined the port, mongoURI and api key here so that i can use them in the code and not write this long part of the code 

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.mongoURI || 'mongodb://localhost:27017/newsblog';
NEWS_API_KEY = process.env.NEWS_API_KEY || 'f11f3bf4ed3f4dbf876d046006c79170'; // this is the api key 

const app = express();
app.use(cors());
app.use(express.json());




// this function deals with connecting to the mongodb database
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema(
  {
  username: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);


//This is where i defined the authentication middleware that will be used to protect the routes that require authentication
// this function checks if the user is authenticated by checking if the token is present in the request


function auth(req, res, next)
 {
const token = req.headers['authorization'];
if (!token) return res.status(401).json({ message: 'No token' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

// Here there is the registration route  which uses the post method to register a new user
//  and it checks if the username and password are present in the request body then it hashes
//  the password using bcrypt and saves the user to the database
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash });
    res.json({ message: 'User registered' });
  } catch (e) {
    res.status(400).json({ message: 'Username taken' });
  }
});



// This is the login route where the user logs in by sending a post request with the username and password
// it checks if the user exists in the database and if the password is correct then it generates
// a token using jwt and sends it back to the client.
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const valid = await bcrypt.compare(password, user.password);
if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});


// this is the news route where i accessed the news api using axios
// it fetches the news articles and sends them back to the client 
app.get('/api/news', auth, async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: { q: 'bitcoin', apiKey: NEWS_API_KEY }
    });
    const articles = response.data.articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url
    }));
    res.json({ articles });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});


// this is used to start a server and listen on port 5000
app.listen(PORT, () => console.log('Server running on port', PORT));
