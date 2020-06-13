const express = require('express');
const router = express.Router();
const canada_province = require('../data/canada_provinces.json');
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
const userBucketList = require('../data/userBucketList.json');

router.get('/canada',(req,res)=>{
   res.status(200).json(canada_province)
})

router.get('/Ontario',(req,res)=>{
   res.status(200).json(Ontario)
})

router.get('/Quebec',(req,res)=>{
   res.status(200).json(Quebec)
})

router.get('/BritishColumbia',(req,res)=>{
   res.status(200).json(BritishColumbia)
})

router.get('/Alberta',(req,res)=>{
   res.status(200).json(Alberta)
})

router.get('/Saskatchewan',(req,res)=>{
   res.status(200).json(Saskatchewan)
})

router.get('/Yukon',(req,res)=>{
   res.status(200).json(Yukon)
})

router.get('/NorthwestTerritories',(req,res)=>{
   res.status(200).json(NorthwestTerritories)
})

router.get('/Manitoba',(req,res)=>{
   res.status(200).json(Manitoba)
})

router.get('/Nunavut',(req,res)=>{
   res.status(200).json(Nunavut)
})

router.get('/NewfoundlandandLabrador',(req,res)=>{
   res.status(200).json(NewfoundlandandLabrador)
})

router.get('/NovaScotia',(req,res)=>{
   res.status(200).json(NovaScotia)
})

router.get('/NewBrunswick',(req,res)=>{
   res.status(200).json(NewBrunswick)
})

router.get('/PrinceEdwardIsland',(req,res)=>{
   res.status(200).json(PrinceEdwardIsland)
})

router.get('/userBucketList',(req,res)=>{
   res.status(200).json(userBucketList)
})

router.post('/userBucketList',(req,res)=>{
   const data = req.body;
   if(userBucketList.find(info=>{return info.id === data.id})){
   res.status(401).send("it already exist")
   }else{ userBucketList.push(req.body);
   res.status(201).json(userBucketList)}
})

module.exports = router;