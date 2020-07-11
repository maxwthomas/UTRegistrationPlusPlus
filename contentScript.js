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
    longhorn.innerHTML = "<input data-toggle='modal' data-target='#ourModal' id='ourButton" + (Math.floor(i/2) + 1) + "' class='ourBtn' type='image' width='40' height='20' src='https://i.imgur.com/bThluov.png'>";

    // Append button to document
    cur = info.children[i];
    if (cur.firstChild.nextSibling.className != "course_header") {
        cur.appendChild(longhorn);
    }
}

// Modal
var modal_content = '<div class="modal fade" id="ourModal" role="dialog">' +
'<div class="modal-dialog">' + 

'<div class="modal-content">' +

  '<div class="modal-header">' +
    '<h4 class="modal-title"></h4>' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
  '</div>' +

  '<div class="modal-body">' +
    '<div class="shadow p-4 mb-4 bg-white">' +
        '<div class="text-center">' +
        '<a href="https://www.ratemyprofessors.com/search.jsp?queryBy=schoolId&schoolName=University+of+Texas+at+Austin&schoolID=1255&queryoption=TEACHER" target="_blank" class="btn btn-primary btn-lg active m-1" aria-pressed="true" id="rmp" role="button">Rate My Prof</a>' +
        '<a href="https://utdirect.utexas.edu/ctl/ecis/results/search.WBX" target="_blank" class="btn btn-primary btn-lg active m-1" aria-pressed="true" id="ecis" role="button">eCIS</a>' +
        '<a href="http://utcatalyst.org/grade-distributions" target="_blank" class="btn btn-primary btn-lg active m-1" aria-pressed="true" id="catalyst" role="button">UT Catalyst</a>' +
        '</div>' +
        '<div class="text-center">' +
        '<a href="#" target="_blank" class="btn btn-primary btn-lg active m-1" aria-pressed="true" id="prereq" role="button">Prereqs</a>' +
        '<a href="#" target="_blank" class="btn btn-primary btn-lg active m-1" aria-pressed="true" id="textbook" role="button">Textbooks</a>' +
        '<a href="#" target="_blank" class="btn btn-primary btn-lg active m-1" aria-pressed="true" id="syllabi" role="button">Syllabi</a>' +
        '</div>' + 
    '</div>' +
  '</div>' +

  '<div class="modal-footer">' +
    '<button type="submit" class="btn btn-success btn-block"><span class="glyphicon glyphicon-off"></span> Add Class</button>' +
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">' +
    '<button id="moon" class="darkBtn"><i class="fa fa-moon-o"></i></button>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</div>';
document.querySelector("#container").innerHTML = modal_content + document.querySelector("#container").innerHTML;

// Enable modal
$(".ourBtn").click(function() {
    $("#ourModal").modal();
});

var course_name;
var prof_name;
var more_info;
$(".ourBtn").click(function() {
  var heading = document.querySelector("#ourModal > div > div > div.modal-header > h4");
  // Get course name
  course_name = this.parentElement.parentElement.previousElementSibling.firstElementChild.innerHTML;
  heading.innerHTML = course_name;

  // Get prof name
  prof_name = this.parentElement.parentElement.children[5].innerHTML;
  if (prof_name != "") {
    heading.innerHTML = heading.innerHTML + " with " + prof_name;
  }

  var more_info_link = this.parentElement.parentElement.firstElementChild.firstElementChild.href;
});

// Dark mode
$('#moon').click(function() {
  // Manually fix box shadow and class text
  if (document.querySelector("#moon > i").className == "fa fa-moon-o") {
    document.querySelector("#ourModal > div > div > div.modal-body > div").className = "shadow p-4 mb-4 bg-grey";
    document.querySelector("#ourModal > div > div > div.modal-header > h4 > h2").style.cssText = "color: white;";
  } else {
    document.querySelector("#ourModal > div > div > div.modal-header > h4 > h2").style.cssText = "color: black;";
  }
  document.querySelector("#ourModal > div > div").classList.toggle("dark-mode");
  $("i", this).toggleClass("fa-moon-o fa-sun-o");
});
