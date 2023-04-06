window.onload = function () {
    var worker = new Worker("worker.js");
    worker.postMessage("ping");
    worker.postMessage([1,2,3,4,5]);
    worker.postMessage({"name":'Mwa ura', "blog": "Mwaura"});
    worker.onmessage = function(event) {
        var message = "Worker say " +event.data;
        document.getElementById('output').innerHTML = message;
    }
}