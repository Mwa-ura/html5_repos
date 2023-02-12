window.onload = function() {
    var button = document.getElementById("previewButton");
    canvas.onclick = previewHandler;
}

function previewHandler() {
    var selectOj = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    // Check which shape have been selected
    // Get its index and assign it to variable shape
    var selectOj = document.getElementById("shape");
    var index = selectOj.selectedIdex;
    var shape = selectOj[index].value;
    // If shape selected is square render the 20 squares
    if (shape == "square") {
        for (var squares = 0; squares < 20; squares++ ) {
            drawSquare(canvas, context)
        }
    };
}