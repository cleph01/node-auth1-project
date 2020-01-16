const express = require('express');

const RegisterRouter = require('./register/register-router.js');

const LoginRouter = require('./login/login-router.js');

const UsersRouter = require('./users/users-router.js');

const session = require('express-session');

const server = express();

const SessionConfig = {
    name: 'auth-creds', //default name of cookie is sid
    secret: 'bla', //used by server to decrypt cookie (Save in .env variable)
    cookie: {
        masAge: 1000, //defines max valid age (expiry) of cookie in milliSec
        secure: false, //True restricts communication over http, requiring https
        httpOnly:true, //true restricts cookie only accessible over http and not vanilla JS
    },
    resave:false, //Do we want to recreate a session if it hasn't changed    
    saveUninitialized:false, //for GDPR because laws against setting cookies automatically
                            //Prompt user to permit to save cookies
};


server.use(express.json());

server.use(session(SessionConfig));

server.use('/api/register', RegisterRouter);

server.use('/api/login', LoginRouter);

server.use('/api/users', UsersRouter);

module.exports = server;