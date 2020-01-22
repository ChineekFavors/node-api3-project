// code away!
const server = require('./server.js');


server.get('/', (req, res) => {
    res.status(200).send(`<h2>Let's write some middleware!</h2>`);
  });

server.listen(4000, () => {console.log('server is ready on port 4000)')});