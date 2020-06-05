// Changes popup to dark mode
function darkMode(){
  var element = document.body;
  element.classList.toggle("dark-mode");
}

$("#moon").click(function() {
    darkMode();
});

$('#moon').click(function() {
  $("i", this).toggleClass("fa-moon-o fa-sun-o");
});