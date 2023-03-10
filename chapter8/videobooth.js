var videos = {
    video1: "http://localhost/~mwaura/demovideo1", 
    video2: "http://localhost/~mwaura/demovideo2"
};
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
    video.addEventListener("error", errorHandler, false); // Check errors in playing
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
    // Grab the video buffer frame/context
    buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
    var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
    // Process the buffer
    var length = frame.data.length / 4;
    for (var i = 0; i < length; i++) {
        var r = frame.data[i * 4 + 0];
        var g = frame.data[i * 4 + 1];
        var b = frame.data[i * 4 + 2];
        if (effectFunction) {
            effectFunction(i, r, g, b, frame.data);
        }
        else if (effectFunction == noir) {
            effectFunction(i, r, g, b, frame.data);
        }
        else if (effectFunction == western) {
            effectFunction(i, r, g, b, frame.data);
        }
        else if (effectFunction == scifi) {
            effectFunction(i, r, g, b, frame.data);
        }
    }
    display.putImageData(frame, 0, 0);
    // Run the the function as soon as possible
    setTimeout(processFrame, 0);
}
// The noir effect
function noir(pos, r, g, b, data) {
    var brightness = (3*r + 4*g + b) >>> 3;
    if (brightness < 0) brightness = 0;
    data[pos * 4 + 0] = brightness;
    data[pos * 4 + 1] = brightness;
    data[pos * 4 + 2] = brightness;
}
// Western effect
function western(pos, r, g, b, data) {
    var brightness = (3*r + 4*g + b) >>> 3;
    data[pos * 4 + 0] = brightness + 40;
    data[pos * 4 + 1] = brightness +20;
    data[pos * 4 + 2] = brightness -20;
}
// Scifi effect
function scifi(pos, r, g, b, data) {
    var offset = pos * 4;
    data[offset] = Math.round(255 - r);
    data[offset +1] = Math.round(255 - g);
    data[offset +2] = Math.round(255 - b);
}
// Cartoon caricature 
function bwCartoon(pos, r, g, b, outputData) {
    var offset = pos * 4;
    if (outputData[offset] > 120) {
        outputData[offset] = 80;
        outputData[++offset] = 80;
        outputData[++offset] = 80;
    }
    else {
        outputData[offset] = 255;
        outputData[offset++] = 255;
        outputData[offset++] = 255;
    }
    outputData[++offset] = 255;
    ++offset;
}
// Function to check errors
function errorHandler() {
    var video = document.getElementById("video");
    if (video.error) {
        video.poster = "images/technicaldifficulties.jpg";
        alert(video.error.message +" "+ video.error.code);
    }
}