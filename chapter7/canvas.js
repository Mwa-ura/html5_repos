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
    // If shape selected is circle render 20 circles
    else if (shape == "circles") {
        for (var circles = 0; circles < 20; circles++) {
            drawCircle(canvas, context);
        }
    }
    else {
        // alert to choose shape
        alert("please choose shape.");
    }    
    // Draw text after images have created
    drawText(canvas, context);
}

// Function to calculate w, x and y axis
function drawSquare(canvas, context) {
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    context.fillStyle = "lightblue"; // Shape color
    context.fillRect(x, y, w, w);
};
// Fill background color handler
function fillBgColor(canvas, context) {
    var selectOj = document.getElementById("bgColor");
    var index = selectOj.selectedIndex;
    var bgColor = selectOj[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
};
// Convert degrees to radians function
function degreesToRadians(degrees) {
    return (degrees * Math.PI/180);
}
 // Draw circle function
function drawCircle(canvas, context) {
    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width)
    var y = Math.floor(Math.random() * canvas.height);
    // Circle path
    context.beginPath()
    context.arc(x, y, radius, degreesToRadians(360), 0, true);
    context.fillStyle = "lightblue";
    context.fill();
 }
 // Twitter API function
 function updateTweets(tweets) {
    var tweetsSelection = document.getElementById("tweets");
    // Iterate the list of tweets received
    for (var i = 0; i < tweets.length; i++) {
        tweet = tweets[i];
        var option = document.createElement("option");
        option.text = tweet.text;
        option.value = tweet.text.replace("\"", "'");
        tweetsSelection.options.add(option);
    }
    tweetsSelection.selectedIndex = 0;
 }
 // Draw text function
 function drawText(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;

    context.fillStyle = fgColor;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);

    // Space for code that will draw tweet text
    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText("and all I got is this lousy t-shirt!", canvas.width-20,
        canvas.height-40);

 }