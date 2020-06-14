const express = require('express');
const router = express.Router();
const userBucketList = require('../data/userBucketList.json');
const { route } = require('./locationRoutes');


router.get('/',(req,res)=>{
   res.status(200).json(userBucketList)
})

router.post('/',(req,res)=>{
   const data = req.body;
   if(userBucketList.find(info=>{return info.id === data.id})){
   res.status(401).send("it already exist")
   }
   else{ userBucketList.push(req.body);
   res.status(201).json(userBucketList)
   }
})

router.delete('/:listId', (req,res)=>{
   if(userBucketList.find(fave=>{return fave.id === req.params.listId})){
      let index = userBucketList.findIndex(item=> item.id === req.params.listId)
      userBucketList.splice(index,1)
      res.status(200).json(userBucketList)
   }
   else{res.status(401).send("Can't Find")
   }
})

router.get('/:listId',(req,res)=>{
   if(userBucketList.find(item=>{
      return item.id === req.params.listId})){
   res.status(200).json(userBucketList.find(item=>{
   return item.id === req.params.listId}))
   }else{res.status(401).send("Does Not Exist")}
})

router.put("/:listId", (req,res)=>{
   if(userBucketList.find(fave=>{return fave.id === req.params.listId})){
      let visited = userBucketList.find(fave=>{return fave.id === req.params.listId})
      visited.statusVisit=true
      res.status(200).json(visited)
   }
   else{res.status(401).send("Can't Find")
   }
})

module.exports = router;