var express = require('express');
var router = express.Router();
var db = require('../../models');
var Day = db.Day;
module.exports = router;

router.get('/', (req, res, next) => {
	Day.findAll()
	.then((days) => {
		res.json(days);
	});
});

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

// router.put('/:id/restaurant', (req, res, next)=>{
// 	Day.findById(req.params.id)
// 	.then((day) => {
// 		day.rest;
// 	});
// });

router.delete('/:id/restaurant', (req, res, next)=>{
	res.send('made it to days');
});

router.put('/:id/hotels', (req, res, next)=>{
	Day.findOne({where: {number: req.params.id}})
	.then((day) => {
		day.update({
			hotelId: req.body.attractionId
		})
	})
	.then(() => {
		  res.sendStatus(204)
	});
});

router.delete('/:id/hotel', (req, res, next)=>{
	;
});

router.put('/:id/activity', (req, res, next)=>{
	res.send('made it to days');
});

router.delete('/:id/activity', (req, res, next)=>{
	res.send('made it to days');
});
