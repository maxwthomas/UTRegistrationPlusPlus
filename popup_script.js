// Changes popup to dark mode
function darkMode(){
  var element = document.body;
  element.classList.toggle("dark-mode");
}

$(document).ready(function() {
  $("#moon").click(function() {
      darkMode();
  });
});