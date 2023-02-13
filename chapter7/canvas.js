window.onload = function() {
    var button = document.getElementById("previewButton");
    button.onclick = previewHandler;
};

function previewHandler() {
    var canvas = document.getElementById("tweetShirt");
    var context = canvas.getContext("2d");
    fillBgColor(canvas, context); // Cover the previous color
    // Check which shape have been selected
    // Get its index and assign it to variable shape
    var selectOj = document.getElementById("shape");
    var index = selectOj.selectedIndex;
    var shape = selectOj[index].value;
    // If shape selected is square render the 20 squares
    if (shape == "squares") {
        for (var squares = 0; squares < 20; squares++ ) {
            drawSquare(canvas, context);
        }
    }
    else {
        alert("Are you sure you don't want any shape!");
    }
};
// Function to calculate w, x and y axis
function drawSquare(canvas, context) {
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    context.fillStyle = "lightblue"; // Shape color
    context.fillRect(x, y, w, w);
}
// Fill background color handler
function fillBgColor(canvas, context) {
    var selectOj = document.getElementById("bgColor");
    var index = selectOj.selectedIndex;
    var bgColor = selectOj[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}