// Import jquery
// var script = document.createElement('script');
// script.src = 'jquery.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

// Changes popup to dark mode
function darkMode(){
  var element = document.body;
  element.classList.toggle("dark-mode");
}

$('#moon').click(function() {
    darkMode();
});

$('#moon').click(function() {
  $("i", this).toggleClass("fa-moon-o fa-sun-o");
});