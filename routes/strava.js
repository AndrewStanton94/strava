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

module.exports = router;