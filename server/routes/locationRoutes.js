const express = require('express');
const router = express.Router();
const Ontario =require('../data/ontario.json');
const Quebec =require('../data/quebec.json');
const BritishColumbia =require('../data/britishColumbia.json');
const Alberta =require('../data/alberta.json');
const Saskatchewan =require('../data/saskatchewan.json');
const Yukon =require('../data/yukon.json');
const NorthwestTerritories =require('../data/northwestTerritories.json');
const Nunavut =require('../data/nunavut.json');
const Manitoba =require('../data/manitoba.json');
const NovaScotia =require('../data/novaScotia.json');
const NewfoundlandandLabrador =require('../data/newfoundland.json');
const NewBrunswick =require('../data/newBrunswick.json');
const PrinceEdwardIsland =require('../data/princeEdwardIsland.json');
const { v4: uuidv4 } = require('uuid');

router.get('/Ontario',(req,res)=>{
   res.status(200).json(Ontario)
})

router.post('/Ontario/:id',(req,res)=>{
   if(Ontario.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = Ontario.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })

      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/Quebec',(req,res)=>{
   res.status(200).json(Quebec)
})

router.post('/Quebec/:id',(req,res)=>{
   if(Quebec.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = Quebec.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/BritishColumbia',(req,res)=>{
   res.status(200).json(BritishColumbia)
})

router.post('/BritishColumbia/:id',(req,res)=>{
   if(BritishColumbia.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = BritishColumbia.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/Alberta',(req,res)=>{
   res.status(200).json(Alberta)
})

router.post('/Alberta/:id',(req,res)=>{
   if(Alberta.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = Alberta.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/Saskatchewan',(req,res)=>{
   res.status(200).json(Saskatchewan)
})

router.post('/Saskatchewan/:id',(req,res)=>{
   if(Saskatchewan.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = Saskatchewan.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/Yukon',(req,res)=>{
   res.status(200).json(Yukon)
})

router.post('/Yukon/:id',(req,res)=>{
   if(Yukon.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = Yukon.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/NorthwestTerritories',(req,res)=>{
   res.status(200).json(NorthwestTerritories)
})

router.post('/NorthwestTerritories/:id',(req,res)=>{
   if(NorthwestTerritories.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = NorthwestTerritories.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})


router.get('/Manitoba',(req,res)=>{
   res.status(200).json(Manitoba)
})

router.post('/Manitoba/:id',(req,res)=>{
   if(Manitoba.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = Manitoba.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/Nunavut',(req,res)=>{
   res.status(200).json(Nunavut)
})

router.post('/Nunavut/:id',(req,res)=>{
   if(Nunavut.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = Nunavut.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/NewfoundlandandLabrador',(req,res)=>{
   res.status(200).json(NewfoundlandandLabrador)
})

router.post('/NewfoundlandandLabrador/:id',(req,res)=>{
   if(NewfoundlandandLabrador.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = NewfoundlandandLabrador.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})


router.get('/NovaScotia',(req,res)=>{
   res.status(200).json(NovaScotia)
})

router.post('/NovaScotia/:id',(req,res)=>{
   if(NovaScotia.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = NovaScotia.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/NewBrunswick',(req,res)=>{
   res.status(200).json(NewBrunswick)
})

router.post('/NewBrunswick/:id',(req,res)=>{
   if(NewBrunswick.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = NewBrunswick.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})

router.get('/PrinceEdwardIsland',(req,res)=>{
   res.status(200).json(PrinceEdwardIsland)
})

router.post('/PrinceEdwardIsland/:id',(req,res)=>{
   if(PrinceEdwardIsland.find(place=>{
      return place.id === req.params.id
   })){
      let addComment = PrinceEdwardIsland.find(place=>{
         return place.id === req.params.id
      })
      addComment.comments.push({
         id:uuidv4(),
         ...req.body
      })
      res.status(200).json(addComment)
   }else{
      res.status(401).send("Can't Find")
   }
})


module.exports = router;