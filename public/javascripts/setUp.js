let toKm = function(inMeters){
	let km = (inMeters / 1000).toFixed(3);
	return km;
},

secToHMS = function(givenSec){
	let hours = Math.floor(givenSec / 3600);
	givenSec = givenSec % 3600;
	let mins = Math.floor(givenSec / 60);
	let secs = givenSec % 60;
	return {hours, mins, secs};
},

formatTime = function(givenSec){
	let time = secToHMS(givenSec);
	return `Hours: ${time.hours} Mins: ${time.mins} Sec: ${time.secs}`;
}

getName = function () {
	fetch('strava/name')
		.then(response => response.json())
		.then(response => {
			console.log(response);
			document.getElementById('userName').innerText = `${response.fName} ${response.lName}`;
		});
},

getActivites = function () {
	fetch('strava/activities')
		.then(activities => activities.json())
		.then(activities => {
			let activiesContainer = document.getElementById('activities');
			activities.forEach(activity => {
				console.log(activity);
				let sec = document.createElement('section'),
					p = document.createElement('p'),
					p2 = document.createElement('p');

				sec.innerHTML = `<h1>${activity.name}</h1>`;
				p.innerText = `Distance: ${toKm(activity.distance)}km`;
				p2.innerText = `Active Time: ${formatTime(activity.moving_time)}`;

				sec.appendChild(p);
				sec.appendChild(p2);
				activiesContainer.appendChild(sec);
			});
		});
},

getSegments = function () {
	fetch('strava/segments')
		.then(segments => segments.json())
		.then(segments => segments.segments)	// The list is in an object
		.then(segments => {
			let segmentsContainer = document.getElementById('segments');
			console.log(segments);
			segments.forEach(segment => {
				console.log(segment);
				let sec = document.createElement('section');
				sec.innerHTML = `<h1>${segment.name}</h1>`;
				let p = document.createElement('p');
				p.innerText = `Distance: ${toKm(segment.distance)} km`;
				sec.appendChild(p);
				segmentsContainer.appendChild(sec);
			});
		})
		.catch(err => {throw(err);});
},

getRoutes = function () {
	fetch('strava/routes')
		.then(routes => routes.json())
		.then(routes => {
			let routesContainer = document.getElementById('routes');
			console.log(routes);
			routes.forEach(route => {
				console.log(route);
				let sec = document.createElement('section');
				sec.innerHTML = `<h1>${route.name}</h1>`;
				let p = document.createElement('p');
				p.innerText = `Distance: ${route.distance}`;
				sec.appendChild(p);
				let desc = document.createElement('p');
				desc.innerText = route.description;
				sec.appendChild(desc);
				routesContainer.appendChild(sec);
			});
		})
		.catch(err => {throw(err);});
};

let setUp = function () {
	console.log('I loaded');
	getName();
	getActivites();
	getSegments();
	getRoutes();
};

window.addEventListener('load', setUp);
