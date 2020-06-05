
//Creating Elements
var btn = document.createElement("th");
var t = document.createTextNode("Plus Plus");
btn.appendChild(t);

    
document.getElementsByClassName("rwd-table results")[0].firstChild.nextSibling.firstChild.nextSibling.appendChild(btn);