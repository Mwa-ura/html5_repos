var otherLocation = {
    latitude: 47.624851,
    longitude: -122.52099
};
var map;
var watchId = null;
var options = {
    enableHighAccuracy: true,
    timeout: 100,
    maximumAge: 0
};
var prevCoords;

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
    // set maximum timeout
    if (options.timeout < 800) {
        return null;
    } else {
        div.innerHTML += " found in " +options.timeout+ "milliseconds";
    }
    /*  Compute the distance and,
        Create div to display the distance between two locations
    */
    var km = computeDistance(position.coords, otherLocation);
    var distance = document.getElementById("distance");
    // distance.innerHTML = "You\'re " +km+ "km from Wickedly HQ.";
    /* if (km < 0.1 ) {
        distance.innerHTML = "You are on fire!";
    } else {
        if (prevKm < km ) {
            distance.innerHTML = "You are getting hotter!";
        } else {
            distance.innerHTML = "You are getting colder...!";
        }
    }
    prevKm = km; */
    // Display map image
    if (map == null) {
        showMap(position.coords);
        // get the cached location
        prevCoords = position.coords;
    }
    else {
        // Create in 20 metres interval marker.
        var meters = computeDistance(position.coords, prevCoords) * 1000;
        if (meters > 20 ) {
            scrollMapToPosition(position.coords); // Add marker upon new position
            prevCoords = null;
        }
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
    // Inform the user the time it takes to track his/her distance.
    options.timeout += 100;
    navigator.geolocation.getCurrentPosition(displayLocation, displayError,
        options);
    div.innerHTML += "...checking again with timeout=" +options.timeout;
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
        displayError, options);
}
// Clear watch handler
function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}
// Drop a new marker when a new location is detected.
function scrollMapToPosition(coords) {
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latLong = new google.maps.LatLng(latitude, longitude);
    
    map.panTo(latLong);
    addMarker(map, latLong, "Your new location", "You moved to " +latitude+ 
        " , " +longitude);

}

