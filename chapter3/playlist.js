// Root javascript
window.onload = init;

function init() {
    var button = document.getElementById("addButton");
    button.onclick = handleButtonClick;
}

function handleButtonClick() {
    var textInput = document.getElementById("songTextInput")
    var songName = textInput.value;
    // Test for null value
    if (songName == "") {
        alert("Please add a song");
    } else {
        alert("Adding " + songName);
    }
    
}