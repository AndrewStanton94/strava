'use strict';
const express = require('express'),
	router = express.Router();

const strava = require('strava-v3');

let getAthlete = function () {
	return new Promise((resolve, reject) => {
		strava.athlete.get({},function(err,payload) {
			if(!err) {
				resolve(payload);
			}
			else {
				reject(err);
			}
		});
	});
};

let getActivities = function () {
	return new Promise((resolve, reject) => {
		console.log('Frantically searching for activities');
		strava.athlete.listActivities({},function(err,payload) {
			if(!err) {
				console.log('Found it');
				resolve(payload);
			}
			else {
				reject(err);
				console.log('Lost them :(');
				console.log(err);
				throw err;
			}
		});
	});
};

let getSegments = function () {
	return new Promise((resolve, reject) => {
		console.log('Frantically searching for segments');
		let latSW = '50.785744',
			longSW = '-1.100618',
			latNE = '50.805040',
			longNE = '-1.048424';
		strava.segments.explore({'bounds':`${latSW},${longSW},${latNE},${longNE}`},function(err,payload) {
			if(!err) {
				console.log('Found it');
				resolve(payload);
			}
			else {
				reject(err);
				console.log('Lost them :(');
				console.log(err);
				throw err;
			}
		});
	});
};

let getRoutes = function () {
	return new Promise((resolve, reject) => {
		console.log('Frantically searching for routes');
		strava.athlete.listRoutes({'id': '15893'},function(err,payload) {
			if(!err) {
				console.log('Found it');
				resolve(payload);
			}
			else {
				reject(err);
				console.log('Lost them :(');
				console.log(err);
				throw err;
			}
		});
	});
};

/* GET users listing. */
router.get('/name', function(req, res, next) {
	getAthlete()
		.then(athlete => {
			return {
				fName: athlete.firstname,
				lName: athlete.lastname
			};
		})
		.then(name => {res.json(name);});
});

router.get('/activities', function(req, res, next) {
	getActivities()
		.then(activities => {
			console.log(activities);
			return activities;
		})
		.then(data => {
			res.send(data);
		})
		.catch(err => {throw  err;});
});

router.get('/segments', function(req, res, next) {
	getSegments()
		.then(segments => {
			console.log(segments);
			return segments;
		})
		.then(data => {
			res.send(data);
		})
		.catch(err => {throw  err;});
});

router.get('/routes', function(req, res, next) {
	getRoutes()
		.then(routes => {
			console.log(routes);
			return routes;
		})
		.then(data => {
			res.send(data);
		})
		.catch(err => {throw  err;});
});
module.exports = router;