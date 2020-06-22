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
var modal_content = '<div class="modal fade" id="ourModal">' +
'<div class="modal-content">' +
  '<div class="modal-header" style="padding:35px 50px;">' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    '<h4><span class="glyphicon glyphicon-lock"></span> Login</h4>' +
  '</div>' +
  '<div class="modal-body" style="padding:40px 50px;">' +
    '<form role="form">' +
      '<div class="form-group">' +
        '<label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label>' +
        '<input type="text" class="form-control" id="usrname" placeholder="Enter email">' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Password</label>' +
        '<input type="text" class="form-control" id="psw" placeholder="Enter password">' +
      '</div>' +
      '<div class="checkbox">' +
        '<label><input type="checkbox" value="" checked>Remember me</label>' +
      '</div>' +
        '<button type="submit" class="btn btn-success btn-block"><span class="glyphicon glyphicon-off"></span> Login</button>' +
    '</form>' +
  '</div>' +
  '<div class="modal-footer">' +
    '<button type="submit" class="btn btn-danger btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>' +
    '<p>Not a member? <a href="#">Sign Up</a></p>' +
    '<p>Forgot <a href="#">Password?</a></p>' +
  '</div></div></div></div>';
document.querySelector("#container").innerHTML = modal_content + document.querySelector("#container").innerHTML;

$("#ourButton").click(function() {
    $("#ourModal").modal();
});