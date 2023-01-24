window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
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
    div.innerHTML = "You are at Latitude " +latitude+ " and Longitude " +longitude+"."

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