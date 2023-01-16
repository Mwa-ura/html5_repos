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
    if (songName == "" ) {
      alert("You have not entered a song");
    } else {
   
        // Create a new element <li> to hold a new song
        var li = document.createElement("li");
        li.innerHTML = songName;

        // Add the element to the DOM
        var ul = document.getElementById("playlist")
        ul.appendChild(li);
    }
}