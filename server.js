const express = require('express');
const server = express();
const helmet = require('helmet');
const userRouter = require('./users/userRouter.js');
const postRouter = require( "./posts/postRouter.js");

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/users', userRouter);
server.use('/posts', postRouter);





//custom middleware

function logger(req, res, next) {

  const method = req.method;
  const url = req.url;
  const timestamp = Date();

  console.log({'method':method, 'URL':url, 'timestamp':timestamp});
  next();

}

module.exports = server;
