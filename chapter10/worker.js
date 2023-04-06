onmessage = pingPong;
function pingPong(event) {
    if (event == "ping") {
        postMessage('Pong');
    }
    else {
        postMessage("Ponki");
    }
}