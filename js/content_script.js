// Dark mode button for course page
var darkmode_course_page = $("<button class='plusPlusDarkCoursePage' id='plusPlusMoonCoursePage'></button>").text("");
var icon_course_page = $("<i class='fa fa-moon-o' id='plusPlusDarkSymbolCoursePage'></i>").text("");
$(darkmode_course_page).append(icon_course_page);
$("#small_search").append(darkmode_course_page);
$("#plusPlusMoonCoursePage").click(function() {
  $("#plusPlusDarkSymbolCoursePage").toggleClass("fa-moon-o fa-sun-o");
  $("#container").toggleClass("dark-mode");
  $("#search_area").toggleClass("dark-mode");
  $("#inner_header").toggleClass("dark-mode");
  $("#inner_body").toggleClass("dark-mode");
  $(".course_header").toggleClass("dark-mode");
  $("h2").toggleClass("dark-mode");
  $("#filter").toggleClass("dark-mode");
});

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
            "<div class='col'><a class='btn btn-primary btn-lg active' id='plusPlusPrereq'>Prereqs</a></div>" +
            "<div class='col'><a href='#' target='_blank' class='btn btn-primary btn-lg active' id='plusPlusTextbook'>Textbooks</a></div>" +
            "<div class='col'><a href='https://www.ratemyprofessors.com/search.jsp?queryBy=schoolId&schoolName=University+of+Texas+at+Austin&schoolID=1255&queryoption=TEACHER' target='_blank' class='btn btn-primary btn-lg active' id='plusPlusRMP'>RMP</a></div>" +
          "</div>" +
        "</div>" +
      "</div>" +

      "<div class='modal-footer'>" +
        "<button id='plusPlusAddClass' type='submit' class='btn btn-success btn-block'>Add Class</button>" +
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

// Dark mode for modal
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

// Modal for description and course prereqs
var modal_content_prereqs = "<div class='modal fade' id='plusPlusModalPrereqs' role='dialog'>" +
"<div class='modal-dialog'>" + 
  "<div class='modal-content' id='plusPlusModalContentPrereqs'>" +

    "<div class='modal-header'>" +
      "<div class='modal-title' id='plusPlusModalTitlePrereqs'></div>" +
      "<button type='button' class='close' id='plusPlusClosePrereqs' data-dismiss='modal'>&times;</button>" +
    "</div>" +

    "<div class='modal-body' id='plusPlusModalBodyPrereqs'>" +
      "<p id='plusPlusPrereqText'></p>" +
    "</div>" +

  "</div>" +
"</div>" +
"</div>";
$("#container").append(modal_content_prereqs);

const END_PATHNAME_INDEX = 38;
const END_PATHNAME = "results/";
var course_name;
var prof_name;
var unique_number;
var unique_number_text;
var more_info_link;
var semester;
var is_available;
$(".plusPlusLonghornBtn").click(function() {
  // Get course name
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

  // Get unique number
  unique_number = $(this).parent().siblings().filter("[data-th='Unique']")[0];
  unique_number_text = unique_number.textContent;

  // Get link to more information
  if (window.location.pathname.substring(END_PATHNAME_INDEX) == END_PATHNAME) {
    more_info_link = $(unique_number).children()[0].href;
  }

  // Get days, times, and building
  days = $(this).parent().siblings().filter("[data-th='Days']")[0].textContent;
  times = $(this).parent().siblings().filter("[data-th='Hour']")[0].textContent;
  building = $(this).parent().siblings().filter("[data-th='Room']")[0].textContent;
  
  // Get semester
  var semester_text;
  if (window.location.pathname.substring(END_PATHNAME_INDEX) == END_PATHNAME) {
    // Semester for menu page
    semester_text = document.querySelector("#title > h1").textContent.split(" ");
  } else {
    // Semester for specific course page
    semester_text = document.querySelector("#inner_header > h1").textContent.split(" ");
  }
  semester = semester_text[0] + " " + semester_text[1];

  // Determine if the course is available
  if (window.location.pathname.substring(END_PATHNAME_INDEX) == END_PATHNAME) {
    // Availability for menu page
    is_available = !($(this).parent().parent().hasClass("unavailable"));
  } else {
    // Availability for specific course page
    var status = $(this).parent().siblings().filter("[data-th='Status']")[0].textContent;
    is_available = !(status == "closed" || status == "cancelled");
  }
  // Disable add button if not available
  if (!is_available) {
    $("#plusPlusAddClass").attr("class", "btn btn-success btn-block disabled");
  } else {
    $("#plusPlusAddClass").attr("class", "btn btn-success btn-block");
  }

  // Create query object and update button links
  var course_query = new Query(more_info_link);
  $("#plusPlusECIS").attr("href", course_query.ecisLink);
  $("#plusPlusTextbook").attr("href", course_query.textbookLink);
  $("#plusPlusRMP").attr("href", course_query.rmp["link"]);

  // Enable prereq modal
  $("#plusPlusPrereq").click(function() {
    $("#plusPlusModalTitlePrereqs").text(course_name);
    $("#plusPlusPrereqText").text(course_query.desc);
    $("#plusPlusModalPrereqs").modal();
  });

  // Alert for sexual misconduct
  if (course_query.sm) {
    alert(course_query.fullName + " has been accused of sexual misconduct.");
  }
});

// Add class to student schedule
$("#plusPlusAddClass").click(function() {
  if (is_available) {
    // Create course object and store it
    var course = new Course(course_name, prof_name, days, times, building, unique_number_text, semester);
    //Storage.storeOne(course.unique_number, course);
  }
});

// Fix scroll
$(window).scroll(function () {
	if ($(document).height() <= $(window).scrollTop() + $(window).height() + 150) {
    alert("hello");
  }
});
