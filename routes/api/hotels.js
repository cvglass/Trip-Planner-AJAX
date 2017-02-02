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

router.get('/:id', (req, res, next) => {
  Hotel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((hotel) => {
    res.json(hotel);
  })
  .catch(next)
})

router.post('/:id', (req, res, next)=>{
	// Hotel.findOne({where: {}})
});

router.put('/', (req, res, next)=>{
	res.send('made it to activities')
});

router.delete('/', (req, res, next)=>{
	res.send('made it to activities')
});
