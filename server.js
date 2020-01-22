const express = require('express');
const server = express();
const helmet = require('helmet');
const userRouter = require('./users/userRouter.js');

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/', userRouter);





//custom middleware

function logger(req, res, next) {
  
  const method = req.method;
  const url = req.url;
  const timestamp = new Date();

  console.log({'method':method, 'URL':url, 'timestamp':timestamp});
  next();

}

module.exports = server;
