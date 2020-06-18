// // Import jquery
// var jquery = document.createElement('script');
// jquery.src = 'jquery.js';
// jquery.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(jquery);

// // Import bootstrap
// var bootstrapjs = document.createElement('script');
// bootstrapjs.src = '/node_modules/bootstrap/dist/js/bootstrap.min.js';
// bootstrapjs.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(bootstrapjs);
// var bootstrapcss = document.createElement('link');
// bootstrapcss.href = '/node_modules/bootstrap/dist/css/bootstrap.min.css';
// bootstrapcss.rel = 'stylesheet';
// document.getElementsByTagName('head')[0].appendChild(bootstrapcss);

// // Import popper
// var popper = document.createElement('script');
// popper.src = '/node_modules/popper.js/dist/popper.min.js';
// popper.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(popper);

// // Import highcharts
// var highcharts = document.createElement('script');
// highcharts.src = '/node_modules/highcharts/highcharts.js';
// highcharts.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(highcharts);

// Header
var header = document.createElement("th");
header.scope = "col";
var txt = document.createTextNode("Plus Plus");
header.appendChild(txt);
document.querySelector("#inner_body > table > thead > tr").appendChild(header);

// Icon
var longhorn;
var pic;
var i;
var info = document.querySelector("#inner_body > table > tbody");
var cur;
for (i = 0; i < info.children.length; i++) {

    // Attach image to longhorn button
    longhorn = document.createElement("td");
    longhorn.style.cssText = "color: rgb(51, 51, 51); text-decoration: none; font-weight: normal";
    pic = document.createElement("input");
    pic.id = "ourButton";
    pic.type = "image";
    pic.width = "40";
    pic.height = "20";
    pic.src = "https://i.imgur.com/bThluov.png";
    longhorn.appendChild(pic);

    // Append button to document
    cur = info.children[i];
    if (cur.firstChild.nextSibling.className != "course_header") {
        cur.appendChild(longhorn);
    }
}

$("#ourButton").click(function() {
    alert("hi");
});