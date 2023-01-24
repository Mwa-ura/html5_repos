window.onload = getMyLocation;

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    }
    else {
        alert("Your browser doesn't support Geolocation API!");
    }
};
// Handler to display location
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // Create a div element
    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude " +latitude+ " and Longitude " +longitude+"."

}