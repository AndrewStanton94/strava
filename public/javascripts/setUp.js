let getName = function () {
	fetch('strava/name')
		.then(response => response.json())
		.then(response => {
			console.log(response);
			let name = `${response.fName} ${response.lName}`;
			document.getElementById('userName').innerText = name;
		});
},
getActivites = function () {
		fetch('strava/activities')
			.then(activities => activities.json())
			.then(activities => {
				let activiesContainer = document.getElementById('activities');
				activities.forEach(activity => {
					console.log(activity);
					let p = document.createElement('p');
					p.innerText = `Distance: ${activity.distance}, Time: ${activity.moving_time}`;
					activiesContainer.appendChild(p);
				});
			});
};
let setUp = function () {
	console.log('I loaded');
	getName();
	getActivites();
}
window.addEventListener('load', setUp);
