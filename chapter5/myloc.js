var otherLocation = {
    latitude: 47.624851,
    longitude: -122.52099
};
var map;
var watchId = null;

window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    }
    else {
        alert("Your browser doesn't support Geolocation API!");
    }
}
// Handler to display location
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // Create a div element
    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude " +latitude+ " and Longitude " 
        +longitude+".";
    // Add accuracy property
    div.innerHTML += " (with accuracy of " +position.coords.accuracy+ " meters)."
    /*  Compute the distance and,
        Create div to display the distance between two locations
    */
    var km = computeDistance(position.coords, otherLocation);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You\'re " +km+ "km from Wickedly HQ.";
    // Display map image
    if (map == null) {
        showMap(position.coords);
    }
}
// Error handler
function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timeout"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage +" "+ error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}
// Compute distance between two locations
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    
    var radius = 6371 // Earth radius
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                             Math.cos(startLongRads) * Math.cos(destLongRads) *
                             Math.cos(startLongRads - destLatRads)) * radius;
    return distance;
}
// Convert degrees to radians 
function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians
}
// Display map image in the webpage
function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, 
        coords.longitude);
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var myDiv = document.getElementById("map");
    map = new google.maps.Map(myDiv, mapOptions);
    // Call addMarker function
    var title = "Your Location";
    var content = "You are here: " +coords.latitude+ " , " +coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}
// Display pin marker
function addMarker(map, latLong, title, content) {
    var markerOptions = {
        position: latLong,
        map: map,
        title: title,
        content: content,
        clickable: true
    };
    var marker = new google.maps.Marker(markerOptions);
    // Create info window object
    var infoWindowOptions = {
        content: content,
        position: latLong
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
    });
}
// Watch location handler
function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, 
        displayError);
}
// Clear watch handler
function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

