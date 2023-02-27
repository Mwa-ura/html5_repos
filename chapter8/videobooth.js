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
function handleControl(e) {
    var id = e.target.getAttribute("id");
    if (id == "play") {
        pushUnPushButtons("play", ["pause"]);
    }
    else if (id == "pause") {
        pushUnPushButtons("pause", ["play"]);
    }
    else if (id == "loop") {
        if (isButtonPushed("loop")) {
            pushUnPushButtons("", ["loop"]);
        } else {
            pushUnPushButtons(["loop"], "");
        }   
    }
    else if (id = "mute") {
        if (isButtonPushed("mute")) { 
            pushUnPushButtons("", ["mute"]);
        } else {
            pushUnPushButtons(["mute"], "")
        }
    }
}
// Set effects handler
function setEffects(e) {
    var id = e.target.getAttribute("id");
    if (id == "normal") {
        pushUnPushButtons("normal", ["western", "noir", "scifi"]);
    } else if (id == "western") {
        pushUnPushButtons("western", ["normal", "noir", "scifi"]);
    } else if (id == "noir") {
        pushUnPushButtons("noir", ["normal", "western", "scifi"]);
    } else if (id == "scifi") {
        pushUnPushButtons("scifi", ["normal", "western", "noir"]);
    }
}
// set Video handler
function setVideo(e) {
    var id = e.target.getAttribute("id");
    if (id == "video1") {
        pushUnPushButtons("video1", ["video2"]);
    } else if (id == "video2") {
        pushUnPushButtons("video2", ["video1"])
    }
}