// Header
var header = $("<th scope='col'></th>").text("Plus Plus");
$("#inner_body > table > thead > tr").append(header);

// Icon
var greyBox;
var longhornImage;
var currentRow;
var allRows = document.querySelector("#inner_body > table > tbody");
for (var i = 0; i < allRows.children.length; i++) {

  // Attach image to longhorn button
  greyBox = $("<td data-th='Plus Plus' class='plusPlusGreyBox'></td>").text("");
  longhornImage = $("<input data-toggle='modal' data-target='#plusPlusModal' class='plusPlusLonghornBtn' id='plusPlusLonghornBtn" + i + "' type='image' width='40' height='20' src='https://i.imgur.com/bThluov.png'>").text("");
  $(greyBox).append(longhornImage);

  // Append button to document
  currentRow = allRows.children[i];
  if (currentRow.firstElementChild.className != "course_header") {
    $(currentRow).append(greyBox);
  }
}

// Modal
var modal_content = "<div class='modal fade' id='plusPlusModal' role='dialog'>" +
  "<div class='modal-dialog'>" + 
    "<div class='modal-content' id='plusPlusModalContent'>" +

      "<div class='modal-header'>" +
        "<div class='modal-title' id='plusPlusModalTitle'></div>" +
        "<button type='button' class='close' id='plusPlusClose' data-dismiss='modal'>&times;</button>" +
      "</div>" +

      "<div class='modal-body' id='plusPlusModalBody'>" +
        "<div class='container'>" +
          "<div class='row' id='plusPlusRowOne'>" +
            "<div class='col'><a href='#' target='_blank' class='btn btn-primary btn-lg active' id='plusPlusSyllabi'>Syllabi</a></div>" +
            "<div class='col'><a href='http://utcatalyst.org/grade-distributions' target='_blank' class='btn btn-primary btn-lg active' id='plusPlusCatalyst'>Catalyst</a></div>" +
            "<div class='col'><a href='https://utdirect.utexas.edu/ctl/ecis/results/search.WBX' target='_blank' class='btn btn-primary btn-lg active' id='plusPlusECIS'>eCIS</a></div>" +
          "</div>" +
          "<div class='row' id='plusPlusRowTwo'>" +
            "<div class='col'><a href='#' target='_blank' class='btn btn-primary btn-lg active' id='plusPlusPrereq'>Prereqs</a></div>" +
            "<div class='col'><a href='#' target='_blank' class='btn btn-primary btn-lg active' id='plusPlusTextbook'>Textbooks</a></div>" +
            "<div class='col'><a href='https://www.ratemyprofessors.com/search.jsp?queryBy=schoolId&schoolName=University+of+Texas+at+Austin&schoolID=1255&queryoption=TEACHER' target='_blank' class='btn btn-primary btn-lg active' id='plusPlusRMP'>RMP</a></div>" +
          "</div>" +
        "</div>" +
      "</div>" +

      "<div class='modal-footer'>" +
        "<button type='submit' class='btn btn-success btn-block'>Add Class</button>" +
        "<button class='plusPlusDarkBtn' id='plusPlusMoon'><i class='fa fa-moon-o' id='plusPlusDarkSymbol'></i></button>" +
      "</div>" +

    "</div>" +
  "</div>" +
"</div>";
$("#container").append(modal_content);

// Enable modal
$(".plusPlusLonghornBtn").click(function() {
  $("#plusPlusModal").modal();
});

// Dark mode
$("#plusPlusMoon").click(function() {
  // Manually fix title text
  if ($("#plusPlusDarkSymbol").attr("class") == "fa fa-moon-o") {
    $("#plusPlusModalTitle").css("color", "white");
  } else {
    $("#plusPlusModalTitle").css("color", "black");
  }
  $("#plusPlusModalContent").toggleClass("dark-mode");
  $("#plusPlusDarkSymbol").toggleClass("fa-moon-o fa-sun-o");
});

var course_name;
var prof_name;
var unique_number;
var more_info_link;
$(".plusPlusLonghornBtn").click(function() {
  // Get course name
  const END_PATHNAME_INDEX = 38;
  const END_PATHNAME = "results/";
  if (window.location.pathname.substring(END_PATHNAME_INDEX) == END_PATHNAME) {
    // Course name for menu page
    course_name = $(this).parent().parent().prevAll().children(".course_header")[0].textContent;
  } else {
    // Course name for specific course page
    course_name = $("#details > h2")[0].textContent;
  }

  // Get prof name
  prof_name = $(this).parent().siblings().filter("[data-th='Instructor']")[0].textContent;
  if (prof_name != "") {
    $("#plusPlusModalTitle").text(course_name +" WITH " + prof_name);
  } else {
    $("#plusPlusModalTitle").text(course_name);
  }

  // Get link to more information
  unique_number = $(this).parent().siblings().filter("[data-th='Unique']")[0];
  more_info_link = $(unique_number).children()[0].href;
});