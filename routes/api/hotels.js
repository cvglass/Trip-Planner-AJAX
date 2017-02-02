var express = require('express');
var router = express.Router();
var db = require('../../models');
var Hotel = db.Hotel;
module.exports = router;

router.get('/', (req, res, next)=>{
	Hotel.findAll()
	.then((hotels)=>{
		res.json(hotels)
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