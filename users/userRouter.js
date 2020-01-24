const express = require('express');
const db = require('./userDb.js');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  res.status(200).json(req.name);
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

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);

});

router.get('/:id/posts', validateUserId, /*validatePost*/  (req, res) => {
  // do your magic!
  db.getUserPosts(req.user)
  .then( userPosts => {
      res.status(200).json(userPosts);
  })
  .catch( err => {
    res.status(500).json({errorMessage: 'something went wrong retrieve user post with the specific Id'});
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
  db.remove(req.params.id)
  .then( userRemove => {
    res.status(201).json({messsge: `user with id ${req.params.id} has been deleted from database`})

  })
    
    
   
});

router.put('/:id', validateUserId, validatePost, (req, res) => {
  // do your magic!
    res.status(400).json(req.post)
     
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  db.getById(req.params.id)
  .then(user => {
    if(user){
      req.user = user;
      next()
    } else {
        res.status(400).json({message: "invalid user id"})
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: "there was a problem reteiving the info"})
  })
  
}

function validateUser(req, res, next) {
  // do your magic!
   req.body;
  db.insert(req.body)
    .then(name =>{
        if(name == ""){
          res.status(400).json({message: "missing required name field" })
        } else{
          req.name = name;
          next()
        } 
    })
    .catch( err => {
      res.status(500).json({errorMessage: "request must have a body with name prooerty"})
    })
   
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  console.log("validatePost:body", body)

  if(!body){
    res.status(400).json({message: "missing post data"})
  } if(!body.name) {
      res.status(400).json({message: "missing required text field"})
  } if(body.name){
    db.getUserPosts(req.params)
      .then(post => {
        req.post = body;
        next()
      })
      .catch(err => {
        res.status(500).json({errorMessage: "there was a problem posting to server"})
      })

  }
}

module.exports = router;
