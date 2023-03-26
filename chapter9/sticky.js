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
        var value = JSON.parse(localStorage.getItem(key));
        addStickyToDOM(key, value);
    }
}
// Add to DOM function
function addStickyToDOM(key, stickyObj) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    sticky.setAttribute("id", key);
    stickies.style.backgroundColor = stickyObj.color
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = stickyObj.value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    window.onclick = deleteSticky;
}
// Create Sticky function
function createSticky() {
    // Create date object to make sticky more unique
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var colorSelectObj = document.getElementById("note_color");
    var index = colorSelectObj.selectedIndex;
    var value = colorSelectObj[index].value;
    var time = currentDate.getTime();
    var key = "sticky_" +time;
    var color = document.getElementById("note_text").value;
    var stickyObj = {
        "value": value,
        "color": color
    };
    localStorage.setItem(key, JSON.stringify(stickyObj));
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));  
    addStickyToDOM(key, stickyObj);
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
function deleteSticky(e) {
    var key = e.target.id;
    if (e.target.tagName.toLowerCase == "span") {
        key = e.parentNode.id;
    }
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
    removeStickyFromDOM(key);
}
// Remove sticky from the DOM
function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}