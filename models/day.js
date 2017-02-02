var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
	number : {
		type : Sequelize.INTEGER
	}
}, {
  instanceMethods: {
    getHotels: function() {
//Ponder: how should we get our array of attraction objects??? instancemethod? get request?
    }
  }
});

module.exports = Day;
