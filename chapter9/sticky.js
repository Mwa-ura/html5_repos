// When the browser loads call init
window.onload = init;
// Init function 
function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;
    // Create an Array
    var stickiesArray = getStickiesArray();
    for (var i = 0; i < stickiesArray.length; i++) {
        var key = stickiesArray[i];
        var value = localStorage.getItem(key);
        addStickyToDOM(key, value);
    }
}
// Add to DOM function
function addStickyToDOM(key, value) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    sticky.setAttribute("id", key);
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    window.onclick = deleteSticky;
}
// Create Sticky function
function createSticky() {
    // Create date object to make sticky more unique
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var time = currentDate.getTime();
    var key = "sticky_" +time;
    var value = document.getElementById("note_text").value;
    localStorage.setItem(key, value);
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));  
    addStickyToDOM(key, value);
}
// Get sticky function
function getStickiesArray() {
    var stickiesArray = localStorage.getItem("stickiesArray");
    if (!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    } else {
        stickiesArray = JSON.parse(stickiesArray);
    }
    return stickiesArray;
}

// Delete old stickies
function deleteSticky(key) {
    localStorage.removeItem(key);
    var stickiesArray = getStickiesArray();
    if (stickiesArray) {
        for (var i = 0; i < stickiesArray.length; i++) {
            if (key == stickiesArray[i]) {
                stickiesArray.splice(i, 1);
            }
        }
    }
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
}