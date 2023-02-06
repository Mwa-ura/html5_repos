window.onload = init;
function init() {
    getSales();
}
function getSales() {
    var url = "http://localhost/~mwaura/sales.json";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
        if (request.status == 200) {
            updateSales(request.responseText);
        }
        else {
            alert("Am going to nail this!");
        }
    };
    request.send();
}
// Sales function
function updateSales(responseText) {
    var salesDiv = document.getElementById("balls");
    salesDiv.innerHTML = responseText;
}