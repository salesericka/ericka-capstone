const express = require('express');
const router = express.Router();
const userBucketList = require('../data/userBucketList.json');
const { route } = require('./locationRoutes');


router.get('/',(req,res)=>{
   res.status(200).json(userBucketList)
})

router.post('/user',(req,res)=>{
   const data = req.body;
   if(userBucketList.find(info=>{return info.userId === data.userId})){
   res.send("this user exists")
   }
   else{ userBucketList.push(req.body);
   res.status(201).json(userBucketList)
   }
})

router.get('/user/:userId',(req,res)=>{
   res.status(200).json(userBucketList.find(info=>{return info.userId === req.params.userId}))
})

router.post('/user/:userId',(req,res)=>{
   const data = req.body;
   if(userBucketList.find(info=>{return info.userId === req.params.userId})){
     let thisUser = userBucketList.find(info=>{return info.userId === req.params.userId}).list
      thisUser.push(req.body)
     res.status(200).send(thisUser)
   }
   else{res.status(201).json(thisUser)}
})

router.delete('/user/:userId/:listId', (req,res)=>{
   let userPath = req.params.userId;
   let listPath = req.params.listId
   let thisUser = userBucketList.find(info=>{return info.userId === userPath}).list
   if(thisUser.find(item=>{return item.id === listPath})){
      let index = thisUser.findIndex(item=> {return item.id === listPath})
      thisUser.splice(index,1)
      res.status(200).json(thisUser)
   }
   else{res.status(401).send("Can't Find")
   }
})

router.put("/user/:userId/:listId", (req,res)=>{
   let userPath = req.params.userId;
   let listPath = req.params.listId
   let thisUser = userBucketList.find(info=>{return info.userId === userPath}).list
   if(thisUser.find(item=>{return item.id === listPath})){
      let visited = thisUser.find(fave=>{return fave.id === req.params.listId})
      visited.statusVisit=true
      res.status(200).json(visited)
   }
   else{res.status(401).send("Can't Find")
   }
})

module.exports = router;