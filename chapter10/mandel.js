var numberOfWorkers = 8;
var workers = []
var nextRow = 0;
var generation = 0;

window.onload = init; // call the handler when the page load fully.
function init() {
    setUpGraphics(); // Get canvas context, set the size, etc.
    // Iterate though the workers.
    for (var i = 0; i < numberOfWorkers; i++) {
        // Create new worker
        var worker = new Worker("worker.js");
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