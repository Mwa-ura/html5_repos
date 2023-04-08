var quotes = ["I hope life isn't a joke, because am not getting it!",
"There is a light at the end of every tunnel..., just pray it is not a train!",
"Do you believe in love at first sight or I should way by again!"];
var index = Math.floor(Math.random() * quotes.length);
postMessage(quotes[index]);