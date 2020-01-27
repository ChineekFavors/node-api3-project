const express = require('express');
const db = require('./postDb.js');



const router = express.Router();


router.get('/', (req, res) => {
  db.get()
  .then( data => {
    res.status(200).json(data) 
  })
  
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  
      res.status(201).json(req.id);
   
});

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  const {id, text, user_id} = req.id;
  db.remove(id)
    .then(deleted => {
      res.status(201).json({message: `successfully deleted!`})
    })
    
});

router.put('/:id',  (req, res) => {
  // do your magic!
  const id = req.params.id;
  const changes = req.body;
  console.log('postRouter.js:id',id)
  console.log('postRouter.js:changes',changes)
  
    if(!body){
      res.status(401).json({message: 'action must have required fields'})
    }
    if(changes.text == ""){
      res.status(401).json({message: 'text field is required!'})
    }
    if(changes['user_id'] == ""){
      res.status(401).json({message: 'user_id field is required!'})
    }
  db.update(id, {changes})
    .then(updated => {
      res.status(201).json(changes);
    })
    .catch(err => {
      res.status(500).json({errorMessage: 'ther was a problem updating to database!'})
    })

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
