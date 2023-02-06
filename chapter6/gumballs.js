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
    // salesDiv.innerHTML = responseText;
    // Convert json file into a javaScript object
    var sales = JSON.parse(responseText);
    //  Iterate each item in the array
    for (i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name +" sold "+ sale.sales +" gumballs.";
        salesDiv.appendChild(div);
    }

}