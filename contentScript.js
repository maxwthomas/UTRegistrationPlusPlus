// Header
var header = document.createElement("th");
var txt = document.createTextNode("Plus Plus");
header.appendChild(txt);
document.getElementsByClassName("rwd-table results")[0].firstChild.nextSibling.firstChild.nextSibling.appendChild(header);

// Icon
var im;
var but;
var i;
var info = document.getElementsByClassName("rwd-table results")[0].firstChild.nextSibling.nextSibling.nextSibling;
var cur;
for (i = 0; i < info.children.length; i++) {
    im = document.createElement("BUTTON");
    im.innerHTML = '<img src="https://i.imgur.com/bThluov.png" />';
    im.style.cssText = "padding: 10px; display: block; max-width: 80px; margin: auto; cursor: pointer; border: none; background-color: rgb(244,244,244)";

    cur = info.children[i];
    // Closed
    if (cur.className == "unavailable") {
        im.style.cssText = "padding: 10px; display: block; max-width: 80px; margin: auto; cursor: pointer; border: none; background-color: rgb(204,204,204)";
    }

    if (cur.firstChild.nextSibling.className != "course_header") {
        cur.appendChild(im);
    }
}