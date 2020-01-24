// code away!
const server = require('./server.js');
const port = process.env.Port || 4000;

server.get('/', (req, res) => {
    res.status(200).send(`<h2>Let's write some middleware!</h2>`);
  });

server.listen(port, () => {console.log('server is ready on port 4000)')});