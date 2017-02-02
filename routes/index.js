var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Place = require('../models/place');
var Promise = require('bluebird');
var aRouter = require('./api/activities');
var hRouter = require('./api/hotels');
var rRouter = require('./api/restaurants')
var dRouter = require('./api/days')

router.use('/api/hotels', hRouter);
router.use('/api/activities', aRouter);
router.use('/api/restaurants', rRouter);
router.use('/api/days', dRouter);


router.get('/', function(req, res, next) {

  var findingHotels = Hotel.findAll({
    include: [Place]
  });

  var findingActivities = Activity.findAll({
    include: [Place]
  });

  var findingRestaurants = Restaurant.findAll({
    include: [Place]
  });

  Promise.all([
    findingHotels,
    findingActivities,
    findingRestaurants
  ])
  .spread(function(hotels, activities, restaurants) {
    res.render('index', {
      hotels: hotels,
      activities: activities,
      restaurants: restaurants
    });
  })
  .catch(next);

});

module.exports = router;
