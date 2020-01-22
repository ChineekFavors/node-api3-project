const express = require('express');
const db = require('./userDb.js');
const router = express.Router();

router.post('/', (req, res) => {
  const name = req.body;
  // do your magic!
  db.insert(name)
    .then(data => {
      res.status(201).json(name);
    })
    .catch( err => {
      res.status(500).json({errorMessage: 'there was an error posting new user to server!'});
    })
  
});

router.post('/:id/posts', (req, res) => {
  const id = req.params.id;
  // do your magic!
  db.insert()
    .then( data => {
      res.status(200).json(data);
    })
    .catch( err => {
      res.status(500).json({errorMessage: 'there was a problem performing a post to the server!'});
    })
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then( data => {
      res.status(200).json({data});

    })
    .catch(err => {
      res.status(500).json({errorMessage: 'there was a problem retrieving data from the server!'});
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then(userById => {
      res.status(200).json(userById)
    })
    .catch(err => {
      res.status(500).json({message: 'there was a problem retrieving data with specific user ID'})
    })


});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  db.getUserPosts(req.user)
  .then( userPosts => {
    // if(userPosts.length > 0 ){
      res.status(200).json(userPosts);
    // }else {
    //   res.status(404).json({message: 'there is no user with specific ID'});
    // }
  })
  .catch( err => {
    res.status(500).json({errorMessage: 'something went wrong retrieve user post with the specific Id'});
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
   req.user = req.params.id;
   console.log('validateUserId:',req.user);
   
  if(req.user){
    next();
  }else {
    res.status(404).json({ message: "invalid user id" })
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
