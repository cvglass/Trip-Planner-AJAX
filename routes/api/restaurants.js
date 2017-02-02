var express = require('express');
var router = express.Router();
var db = require('../../models');
var Restaurant = db.Restaurant;
module.exports = router;

router.get('/', (req, res, next)=>{
	Restaurant.findAll()
	.then((restaurants)=>{
		res.json(restaurants)
	})
	.catch();
});

router.post('/', (req, res, next)=>{
	res.send('made it to activities')
});

router.put('/', (req, res, next)=>{
	res.send('made it to activities')
});

router.delete('/', (req, res, next)=>{
	res.send('made it to activities')
});