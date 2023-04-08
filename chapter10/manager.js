window.onload = function () {
    var numWorkers = 3;
    var workers = [];
    // Iterate the workers
    for (var i = 0; i < numWorkers; i++) {
        var worker = new Worker("worker.js");
        worker.onmessage = function(event) {
            alert(event.target +" Says "+ event.data);
        };
        workers.push(worker);
    }
    for (var i = 0; i < workers.length; i++) {
        workers[i].postMessage("ping");
    }
}