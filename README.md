## NEWS WEB PROJECT

## Setup Instructions

## packages to install to download

vscode code editor
node js
npm
mongodb and mongodb compass

# login

in the login directory open a terminal and run the below code to install depedencies

npm install

then

run npm run dev so as to start your front end it will give out a link with a local host and a port number copy the link and paste it in a web browser

# server

in the server directory open a terminal and run the below code to install depedencies

npm install

create a .env in your server directory and paste the below lines
JWT_SECRET=this_is where_i_stored_my_secret_text
NEWS_API_KEY=f11f3bf4ed3f4dbf876d046006c79170
PORT=5000
mongoURI=mongodb://localhost:27017/newsblog

## Running the project

open up 3 terminal instances
1st terminal open the mongodb dtabase using this command
sudo systemctl start mongodb
2nd terminal go to the server directory and run the index.js with this command
nodemon run index.js
3rd terminal go to the login directory and run npm run dev then follow the link in the terminal to the local host running on port 5000 and run to see the web app

## Features

registration -used to register new users into the news web app

login- where i used Jason Web Tokens for authentication

News -which can be accesed after authentication

passwords which hashed using the bcryptjs algorithm

News are fetched from a news api https://newsapi.org/v2/everything?q=bitcoin&apiKey=f11f3bf4ed3f4dbf876d046006c79170

## Security & API Considerations

Password Hashing
Passwords are hashed using bcryptjs before being stored in MongoDB. This ensures that even if the database is compromised, raw passwords are not exposed.

Jason Web Token Authentication
After login, a JWT token is issued and must be included in the Authorization header for protected routes.

API Key Security
The NewsAPI key is stored in the backend .env file and never exposed to the frontend or client. All news requests are proxied through the backend.

## Challenges Faced & Solutions

i faced alot of challenges
Syntax errors in the code
Learning about controller, routers, and jason web tokens and bycryptjs hashing algorithm
learning about api integration

## solutions

in depth practice until i understood the concept and code
reading the error messages so as to get an idea of the error encountered and diagnosing the error without help

## Suggested Future Improvements

signing up buy Email verification for users

Forgot password functionality in the login page

Adding a user profile for users

designing of the news page so that it looks better

## Estimated Time Spent

Learning more on Mern Stack and creating the server folder = I spent 2 days

Learning on the mern stack login folder: 1 day

Authentication, Jason Web Tokens, and learning on how to do integration of api's: i took 2 days

5 days in total

## Thank you for the opportunity i learnt alot
