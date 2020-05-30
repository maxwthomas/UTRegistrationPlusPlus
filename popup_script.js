function link(website) {
  window.open(website);
}

var but1 = document.getElementById('button1');
if (but1) {
    but1.addEventListener('click', function() {link("https://registrar.utexas.edu/schedules")}, false);
}
var but2 = document.getElementById('button2');
if (but2) {
    but2.addEventListener('click', function() {link("https://onestop.utexas.edu/registration-and-degree-planning/registering-for-classes/registration-times")}, false);
}
var but3 = document.getElementById('button3');
if (but3) {
    but3.addEventListener('button3').addEventListener('click', function() {link("https://utdirect.utexas.edu/apps/registrar/ut_planner")}, false);
}