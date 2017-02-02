var express = require('express');
var router = express.Router();
var db = require('../../models');
var Activity = db.Activity;
module.exports = router;

router.get('/', (req, res, next)=>{
	Activity.findAll()
	.then((activities)=>{
		res.json(activities)
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