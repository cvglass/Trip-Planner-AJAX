var express = require('express');
var router = express.Router();
var db = require('../../models');
var Day = db.Day;
module.exports = router;

router.get('/:id', (req, res, next)=>{
	Day.findOne({
		where: {
			id: req.params.id
		}
	})
	.then((day)=>{
		res.json(day)
	})
	.catch();
});

router.post('/', function(req, res, next){
	// console.log(req.body);
	Day.create({
		number: +req.body.dayNumber
	})
	.then(function(){
		res.sendStatus(201);
	})
	
})

router.post('/:id/restaurants', (req, res, next)=>{
	res.send('made it to days')
});

router.delete('/:id/restaurants', (req, res, next)=>{
	res.send('made it to days')
});

router.post('/:id/hotels', (req, res, next)=>{
	res.send('made it to days')
});

router.delete('/:id/hotels', (req, res, next)=>{
	res.send('made it to days')
});

router.post('/:id/activities', (req, res, next)=>{
	res.send('made it to days')
});

router.delete('/:id/activities', (req, res, next)=>{
	res.send('made it to days')
});