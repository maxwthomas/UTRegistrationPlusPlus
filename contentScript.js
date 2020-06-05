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
    im.innerHTML = '<img src="images/longhorn.png" />';

    cur = info.children[i];
    if (cur.firstChild.nextSibling.className != "course_header") {
        cur.appendChild(im);
    }
}