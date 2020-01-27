const express = require('express');
const db = require('./userDb.js');
const router = express.Router();



//good
router.post('/', validateUser, (req, res) => {
  res.status(200).json(req.name);
});
//good
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
//good
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);

});

router.get('/posts/:id', validateUserId, /*validatePost,*/ (req, res) => {
 
      res.status(200).json(req.post);
 
});
//good
router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
    const {id} = req.user;
  db.remove(id)
  .then( userRemove => {
    res.status(201).json({messsge: `user with id ${id} has been deleted from database`})

  })
  .catch( err => {
    res.status(500).json({errorMessage: "there was a problem deleted user from data!"})
  })
    
    
   
});
//good
router.put('/:id', validateUserId, validateUpDate, (req, res) => {
  // do your magic!
  res.status(200).json(req.body);
  
});

//custom middleware
//good
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
//good
function validateUser(req, res, next) {
// do your magic!
const {name} = req.body;
console.log("validateUser:name", name)
  if(name == undefined){
    res.status(400).json({message: "request must have a body with name property!" })
  }
  if(name == ""){
    res.status(400).json({message: "missing required name field" })
  }
  
  db.insert(req.body)
    .then(name =>{
          req.name = name;
          next();    
    })
    .catch( err => {
      res.status(500).json({errorMessage: "there was a problem with your request!"})
    })
   
}

function validatePost(req, res, next) {
  // do your magic!
  const  {text, user_id} = req.body;
  

  if(!text && !user_id){
    res.status(400).json({message: "missing post data"})

  } if(!id || !text || !user_id) {
      res.status(400).json({message: "missing required text field"})

  } else if(text, user_id){
      db.getUserPosts(req.user)
        .then(post => {
          req.post = post;
          next()
        })
        .catch(err => {
          res.status(500).json({errorMessage: "there was a problem posting to server"})
        })
  }
}
//good
function validateUpDate( req, res, next) {
  const {id, name} = req.body;

  if(!req.body) {
    res.status(400).json({message: "must have id and name field"})
  }
  if(id == "") {
    res.status(400).json({message: "must have id field"}) 
  }
  if(name == ""){
    res.status(400).json({message: "must have name field"}) 
  }

  db.update(req.user.id , {id, name})
    .then( post => {
      req.body = {id, name};
      console.log("update:req.user",req.user)
      console.log("userRouter.js:validateUpDate:.then:req.body",req.body)
      next();
    })
    .catch( err => {
      res.status(500).json({errorMessage: "there was a problem updating to server"})  
    })
}

module.exports = router;
