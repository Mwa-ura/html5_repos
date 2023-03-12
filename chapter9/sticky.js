// When the browser loads call init
window.onload = init;
// Init function 
function init() {
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