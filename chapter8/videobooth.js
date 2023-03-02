var videos = {video1: "video/demovideo1", video2:"video/demovideo2"};
var effectFunction = null;

window.onload = function() { // Invoked when page is fully loaded
    // Video objects
    var video = document.getElementById("video");
    video.src = videos.video1 + getFormatExtension()
    video.load();
    // Control links
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
    video.addEventListener("ended", endedHandler, false); // Check if video has ended
    video.addEventListener("play", processFrame, false); // check if video play mode
}
function handleControl(e) {
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");
    if (id == "play") {
        pushUnPushButtons("play", ["pause"]);
        if (video.ended) { // Check if the video has ended
            video.load(); // load if it has ended
        }
        video.play();
    }
    else if (id == "pause") {
        pushUnPushButtons("pause", ["play"]);
        video.pause();
    }
    else if (id == "loop") {
        if (isButtonPushed("loop")) {
            pushUnPushButtons("", ["loop"]);
        } else {
            pushUnPushButtons(["loop"], "");
        }
        video.loop = !video.loop;
    }
    else if (id = "mute") {
        if (isButtonPushed("mute")) { 
            pushUnPushButtons("", ["mute"]);
        } else {
            pushUnPushButtons(["mute"], "")
        }
        video.muted = !video.muted;
    }
}
// Set effects handler
function setEffects(e) {
    var id = e.target.getAttribute("id");
    if (id == "normal") {
        pushUnPushButtons("normal", ["western", "noir", "scifi"]);
        effectFunction = null;
    } else if (id == "western") {
        pushUnPushButtons("western", ["normal", "noir", "scifi"]);
        effectFunction = western;
    } else if (id == "noir") {
        pushUnPushButtons("noir", ["normal", "western", "scifi"]);
        effectFunction = noir;
    } else if (id == "scifi") {
        pushUnPushButtons("scifi", ["normal", "western", "noir"]);
        effectFunction = scifi;
    }
}
// set Video handler
function setVideo(e) {
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");
    if (id == "video1") {
        pushUnPushButtons("video1", ["video2"]);
    } else if (id == "video2") {
        pushUnPushButtons("video2", ["video1"]);
    }
    video.src = videos[id] + getFormatExtension();
    video.load();
    video.play();
    pushUnPushButtons("play", ["pause"]);
}
// Helper functions 
function pushUnPushButtons(idToPush, idArrayToUnPush) {
    if (idToPush != "") {
        var anchor = document.getElementById(idToPush);
        var theClass = anchor.getAttribute("class");
        if (!theClass.indexOf("selected") >= 0) {
            theClass = theClass +" selected";
            anchor.setAttribute("class", theClass);
            var newImage = "url(images/" +idToPush+ "pressed.png)";
            anchor.style.backgroundImage = newImage;
        }
    }
    for (var i = 0; i < idArrayToUnPush.length; i++) {
        var anchor = document.getElementById(idArrayToUnPush[i]);
        var theClass = anchor.getAttribute("class");
        if (theClass.indexOf("selected") >=0) {
            theClass = theClass.replace("selected", "");
            anchor.setAttribute("class", theClass);
            anchor.style.backgroundImage = "";
        }
    }
}
// Check if the button is clicked
function isButtonPushed(id) {
    var anchor = document.getElementById(id);
    var theClass = anchor.getAttribute("class");
    return (theClass.indexOf("selected") >= 0);
}
// Get the video type
function getFormatExtension() {
    var video = document.getElementById("video");
    if (video.canPlayType("video/mp4") != "") {
        return ".mp4";
    } else if (video.canPlayType("video/webm") != "") {
        return ".webm";
    } else if (video.canPlayType("video/ogg") != "") {
        return ".ogv";
    }
}
// Ended video handler
function endedHandler() {
    pushUnPushButtons("", ["play"]);
}
// Function to process video for effects implementation
function processFrame() {
    var video = document.getElementById("video");
    if (video.paused || video.ended) {
        return;
    }
    var bufferCanvas = document.getElementById("buffer");
    var displayCanvas = document.getElementById("display");
    var buffer = bufferCanvas.getContext("2d");
    var display = displayCanvas.getContext("2d");
}