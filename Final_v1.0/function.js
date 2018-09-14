// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
function initialize() {
	var brasilia = { lat: 47.036718, lng: 28.888016 };
	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		zoom: 12,
		center: brasilia
	});
	
	// This event listener calls addMarker() when the map is clicked.
	google.maps.event.addListener(map, function(event) {
		addMarker(event.latLng, map);
	});
	
	// Add a marker at the center of the map.
	addMarker(brasilia, map);
}

// Adds a marker to the map.
function addMarker(location, map) {
	// Add the marker at the clicked location, and add the next-available label
	// from the array of alphabetical characters.
	var marker = new google.maps.Marker({
		position: location,
		label: labels[labelIndex++ % labels.length],
		map: map
	});
}
function loadScript()
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=initialize";
	document.body.appendChild(script);
}

window.onload = loadScript;

google.maps.event.addDomListener(window, 'load', initialize);