function link(website) {
  window.open(website);
}

document.getElementById('button1').addEventListener('click', function() {link("https://registrar.utexas.edu/schedules")}, false);
document.getElementById('button2').addEventListener('click', function() {link("https://onestop.utexas.edu/registration-and-degree-planning/registering-for-classes/registration-times")}, false);
document.getElementById('button3').addEventListener('click', function() {link("https://utdirect.utexas.edu/apps/registrar/ut_planner")}, false);