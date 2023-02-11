var lastReportTime = 0;
window.onload = function() {
    setInterval(handleRefresh, 3000)
}
// Set up a jsonp url
function handleRefresh() {
    var url = "http://gumball.wickedlysmart.com/?callback=updateSales" +
    "&lastreporttime=" + lastReportTime +
    "&random=" + (new Date()).getTime();
    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");

    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement == null ) {
        head.appendChild(newScriptElement);
    }
    else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}
function getSales() {
    // var url = "http://localhost/~mwaura/sales.json";
   /* var url = "http://gumball.wickedlysmart.com/gamball/gamball.html";
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
    request.send(null); */
}
// Sales function
function updateSales(sales) {
    var salesDiv = document.getElementById("balls");
    /* salesDiv.innerHTML = responseText;
    Convert json file into a javaScript object 
    var sales = JSON.parse(responseText); */
    //  Iterate each item in the array
    for (i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name +" sold "+ sale.sales +" gumballs.";
        salesDiv.appendChild(div);
    }
    // Remove duplicate sales
    if (sales.length > 0 ) {
        lastReportTime = sales[sales.length -1].time
    }

}