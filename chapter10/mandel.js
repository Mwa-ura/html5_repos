var numberOfWorkers = 8;
var workers = []
var nextRow = 0;
var generation = 0;

window.onload = init; // call the handler when the page load fully.
function init() {
    setUpGraphics(); // Get canvas context, set the size, etc.
    // Resize the canvas to windows size
    window.onresize = function() {
        resizeToWindow();
    };
    // Onclick event, call position x and y of click
    canvas.onclick = function(event) {
        handleClick(event.clientX, event.clientY);
    };
    // Iterate though the workers.
    for (var i = 0; i < numberOfWorkers; i++) {
        // Create new worker
        var worker = new Worker("workers.js");
        // Set each worker's message handler
        worker.onmessage = function(event) {
            processWork(event.target, event.data);
        }
        // Know which worker is working or idle.
        worker.idle = true;
        // Add worker to the array of workers.
        workers.push(worker);
    }
    startWorkers(); 
}
// Start and restart the workers
function startWorkers() {
    generation++;
    nextRow = 0;
    // Iterate the workers.
    for (var i = 0; i < workers.length; i++) {
        var worker = workers[i];
        if (worker.idle) { // Check whether the worker is idle.
            var task = createTask(nextRow); // Make a new task.
            worker.idle = false; // Set worker busy mode.
            // Start work by posting a message containing the task.
            worker.postMessage(task);
            // Increment rows to assign the next row the other worker.
            nextRow++; 
        }
    }
}
// Hand results to drawRow to draw pixel in the canvas.
function processWork(worker, workerResults) {
    // Check workers generation matches the current one
    if (workerResults.generation == generation) {
        drawRow(workerResults);
    }
    reassignWorker(worker);
}
// Give worker a new assignment
function reassignWorker(worker) {
    var row = nextRow++;
    if (row >= canvas.height) {
        worker.idle = true;
    } else {
        var task = createTask(row);
        worker.idle = false;
        worker.postMessage(task);
    }
}
// handleClick event function 
function handleClick(x,y) {
    var width = r_max - r_min;
    var height = i_min -i_max;
    var click_r = r_min + width * x/canvas.width;
    var click_i = i_max + height * y/canvas.height;

    var zoom = 8;

    r_min = click_r - width/zoom;
    r_max = click_r + width/zoom;
    i_max = click_i - height/zoom;
    i_min = click_i + height/zoom;

    startWorkers(); //Restart the workers
}
// Make sure the canvas width and height match that of the window
function resizeToWindow() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var width = ((i_max - i_min) * canvas.width/canvas.height);
    var r_mid = (r_max + r_min)/2;
    r_min = r_mid - width/2;
    r_max = r_mid + width/2;
    rowData = ctx.createImageData(canvas.width, 1);

    startWorkers(); // Restart workers
}