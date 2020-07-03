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
    longhorn.innerHTML = "<input data-toggle='modal' data-target='#ourModal' id='ourButton' type='image' width='40' height='20' src='https://i.imgur.com/bThluov.png'>";

    // Append button to document
    cur = info.children[i];
    if (cur.firstChild.nextSibling.className != "course_header") {
        cur.appendChild(longhorn);
    }
}

// Modal
var modal_content = '<div class="modal fade" id="ourModal" role="dialog" aria-hidden="false">' +
'<div class="modal-dialog">' + 

'<div class="modal-content">' +

  '<div class="modal-header">' +
    '<h4 class="modal-title">Course Name</h4>' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
  '</div>' +

  '<div class="modal-body">' +
    '<p style="box-shadow: 5px 5px 20px rgb(161, 161, 161)">' +
    '<button class="btn btn-primary" id="rmp" type="button">Rate My Prof</button>' +
    '<button class="btn btn-primary" id="ecis" type="button">eCIS</button>' +
    '<button class="btn btn-primary" id="catalyst" type="button">UT Catalyst</button>' +
    '<button class="btn btn-primary" id="prereq" type="button">Prereqs</button>' +
    '<button class="btn btn-primary" id="textbook" type="button">Textbooks</button>' +
    '<button class="btn btn-primary" id="syllabi" type="button">Syllabi</button>' +
    '</p>' +
  '</div>' +

  '<div class="modal-footer">' +
    '<button type="submit" class="btn btn-success btn-block"><span class="glyphicon glyphicon-off"></span> Add Class</button>' +
  '</div></div></div></div>';
document.querySelector("#container").innerHTML = modal_content + document.querySelector("#container").innerHTML;

$("#ourButton").click(function() {
    $("#ourModal").modal();
});
