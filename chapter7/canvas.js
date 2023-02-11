window.onload = function() {
    var canvas = document.getElementById("tweetShirt");
    var context = canvas.getContext("2d");
    // Check whether the browser supports canvas
    if (context) {
        context.fillRect(10, 10, 100, 100);
    }
    else {
        alert("Your browser don't support canvas");
    }
}