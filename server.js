const express = require('express');
const server = express();
const userRouter = require('./users/userRouter.js');


server.use(express.json());
server.use('/', userRouter);





//custom middleware

function logger(req, res, next) {}

module.exports = server;
