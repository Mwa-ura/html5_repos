// When the browser loads call init
window.onload = init;
// Init function 
function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        /*if (key.substring(0, 6) == "sticky") {
            var value = localStorage.getItem(key);
            addStickyToDOM(value);
        } */
        var value = localStorage.getItem(key);
        addStickyToDOM(value);
    }
}
// Add to DOM function
function addStickyToDOM(value) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
}
// Create Sticky function
function createSticky() {
    var value = document.getElementById("note_text").value;
    var key = "sticky_" +localStorage.length;
    localStorage.setItem(key, value);
    addStickyToDOM(value);

}