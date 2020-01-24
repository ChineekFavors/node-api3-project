const express = require('express');
const db = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
 
  db.get()
  .then( data => {
    res.status(200).json(data) 
  })
  
    
  
  // do your magic!
  
});

router.get('/:id', (req, res) => {
  // do your magic!
  console.log(req.params.id)
  db.getById(req.params.id)
  .then( data => {
    res.status(201).json(data);
  })
  
    
      res.status(200).json(data);
    
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
 
  db.getById(req.params.id)
  .then(user => {
    if(user){
      req.id = user;
      next()
    } else {
        res.status(400).json({message: "invalid user id"})
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: "there was a problem reteiving post info"})
  })

}

module.exports = router;
