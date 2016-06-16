fetch('https://weathersync.herokuapp.com/ip',{
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
}).then(function(response){
	if(response.ok)
		return response.json();
}).then(function(response){
	var city = response.city;
	document.getElementById('city').innerHTML = city;
	var location = response.location;
	var url = 'https://weathersync.herokuapp.com/weather/' + location.latitude + ',' + location.longitude;
	fetch(url,{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'	
		}
	}).then(function(response){
		if(response.ok)
			return response.json();
	}).then(function(response){
		var weather = response.weather;
		var temp = response.main.temp;
		var farenheit = Math.floor(9/5 * temp - 459.67);
		document.getElementById('temp').innerHTML = farenheit + '<span>&#8457;</span>';
		document.getElementById('description').innerHTML = weather[0].description;
		var url = 'http://openweathermap.org/img/w/' + weather[0].icon + '.png';
		document.getElementById('icon').src = url
	})
}).catch(function(error){
	console.log(error);
})