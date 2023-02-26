window.onload = function() { // Invoked when page is fully loaded
    var controlsLinks = document.querySelectorAll("a.control");
    for (var i = 0; i < controlsLinks.length; i++) {
        controlsLinks[i].onclick = handleControl;
    }
    // Add effect handler
    var effectLinks = document.querySelectorAll("a.effect");
    for (var i = 0; i < effectLinks.length; i++) {
        effectLinks[i].onclick = setEffects;
    }
    // Select video handler
    var videoLinks = document.querySelectorAll("a.videoSelection");
    for (var i = 0; i < videoLinks.length; i++) {
        videoLinks[i].onclick = setVideo;
    }
    pushUnPushButtons("video1", []);
    pushUnPushButtons("normal", []);
}