// class to represent a schedule for a student
class Schedule {

  // Temporary: {semester: [start date, day of week, end date, day of week], ...}
  static START_END_DAYS = {
    "Fall 2019":["2019-08-28", "W", "2019-12-09", "M"],
    "Spring 2020":["2020-01-21", "T", "2020-05-08", "F"],
    "Summer 2020":["2020-06-04", "TH", "2020-08-14", "F"],
    "Fall 2020":["2020-08-26", "W", "2020-12-07", "M"]};
  static WEEKDAYS = {"M":1, "T":2, "W":3, "TH":4, "F":5};

  // takes a string of semester in the format "Season Year" (Fall 2018)
  constructor(semester) {
    this.semester = semester;
    this.courses = [];
  }

  // given course object, adds course to the schedule
  addCourse(course) {
    this.courses.push(course);
  }

  // given course object, removes a course from the schedule
  removeCourse(course) {
    // find course
    var swapped = false;
    var i = 0;
    while (!swapped && i < this.courses.length) {
      if (this.courses[i] == course) {
        // swap course object to end
        swapped = true;
        this.courses[i] = this.courses[this.courses.length - 1];
        this.courses[this.courses.length - 1] = course;
      }
      i++;
    }
    if (swapped) {
      this.courses.pop();
    }
  }

  // removes all courses from the schedule
  removeAllCourses() {
    this.courses = [];
  }

  // returns a string of course names currently in schedule
  // used for debugging
  getClassList() {
    var result = "";
    for (var i = 0; i < this.courses.length; i++) {
      result += this.courses[i].name + " ";
    }
    return result;
  }

  // given a schedule object displays the schedule by updating the scheduler
  static displaySchedule(schedule, scheduler) {
    scheduler.clearAll();
    var json_format = [];
    for (var i = 0; i < schedule.courses.length; i++) {
      var json_format_course = schedule.courses[i].getJSON();

      // json format course could have multiple entries
      for (var entry = 0; entry < json_format_course.length; entry++) {
        json_format.push(json_format_course[entry]);
      }
    }
    scheduler.parse(json_format, "json"); 
  }

  // given a string of the time in the format "hh:mm p.m."
  // converts time to military time in the format "hh:mm:ss"
  static convertToMilitary(normal_time) {
    var result = normal_time.split(" ")[0];
    var time_of_day = normal_time.split(" ")[1];
    var string_hour = result.split(":")[0];
    var hour = parseInt(string_hour, 10);
    var military_minutes = result.split(":")[1];

    // add 12 to the hours of result
    if (time_of_day == "p.m." && string_hour != "12") { 
      var military_hour = hour + 12;
      result = military_hour + ":" + military_minutes + ":00";
    } else if (time_of_day == "a.m." && string_hour == "12") {
      // special case: midnight
      result = "00:00:00";
    } else {
      // add zero before hour for 1 a.m. - 9 a.m.
      if (time_of_day == "a.m." && (hour >= 1 && hour <= 9)) {
        result = "0" + hour + ":" + military_minutes;
      }
      result += ":00";
    }
    return result;
  }

  // given two strings of time in military time format "hh:mm:ss"
  // calculates the seconds of the difference in time
  static calculateSeconds(start_time, end_time) {
    var start_list = start_time.split(":");
    var end_list = end_time.split(":");

    var start_hour = start_list[0];
    var start_min = start_list[1];
    var start_sec = start_list[2];
    var end_hour = end_list[0];
    var end_min = end_list[1];
    var end_sec = end_list[2];

    var result = ((end_sec - start_sec) + ((end_min - start_min) * 60) + (end_hour - start_hour) * 3600);
    return result;
  }

  // given a date in the format "yyyy-mm-dd"
  // determines if the day is an actual day and corrects it if not
  // ex: 2020-12-32 becomes 2021-01-01
  static correctDate(date) {
    var date_list = date.split("-");
    var year = parseInt(date_list[0], 10);
    var month = parseInt(date_list[1], 10);
    var day = parseInt(date_list[2], 10);
    var leap_year = (year % 4 == 0);

    // last day for [Jan, Feb, Mar, ...]
    var last_day = [31, (leap_year ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > last_day[month - 1]) {
      day = day - last_day[month - 1];

      // edge case: change year
      if (month == 12) {
        month = 1;
        year++;
      } else {
        // change month
        month++;
      }
    }
    // fix leading zeros
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return "" + year + "-" + month + "-" + day;
  }
}

$(document).ready(function() {

  // get dictionary of courses for all semesters
  // dictionary in format {unique number: course object}
  //var courses = Storage.retrieveAll();
  var eng = new Course("eng", "bob", " MWF ", " 12:00 p.m.-1:00 p.m. ", "SAC", 123, "Spring 2020");
    var span = new Course("span", "maria", " TTH ", " 2:00 p.m.-3:30 p.m. ", "CPA", 456, "Summer 2020");
    var math = new Course("math", "rob", " MW ", " 12:00 p.m.-1:00 p.m. ", "RLM", 232, "Fall 2019");
    var chem1 = new Course("chem", "fak", " T ", " 3:30 p.m.-5:00 p.m. ", "CPA", 573, "Spring 2020");
    var chem2 = new Course("chem2", "sotelo", " W ", " 12:00 p.m.-1:00 p.m. ", "NA", 90, "Fall 2020");
    var tennis = new Course("tennis", "nate", " WF ", " 12:00 p.m.-1:00 p.m. ", "NA", 87, "Fall 2020");
    var prob = new Course("prob", "paul", " W ", " 12:00 p.m.-1:00 p.m. ", "NA", 44, "Fall 2020");
    var courses = {};
    courses[123] = eng;
    courses[456] = span;
    courses[232] = math;
    courses[573] = chem1;
    courses[90] = chem2;
    courses[87] = tennis;
    courses[44] = prob;

  // create a dictionary of schedules for each unique semester
  // dictionary in format {semester: schedule object}
  var schedules = {};
  for (var key in courses) {
    var course = courses[key];
    var schedule;
    if (course.semester in schedules) {
      var schedule = schedules[course.semester];
    } else {
      var schedule = new Schedule(course.semester);
      schedules[course.semester] = schedule;
    }
    schedule.addCourse(course);
  }

  // add options to drop down menu
  for (var semester in schedules) {
    var option = $("<option value='" + semester + "'></option>").text(semester);
    $("#plusPlusSemesterOptions").append(option);
  }

  // fix euro symbols
  scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_bar_date = function(start,end,ev){  	
      return "* <b>"+scheduler.templates.event_date(start)+"</b> - <b>"+scheduler.templates.event_date(end)+"</b> ";
    };
  });

  // display default
  if (Object.keys(schedules).length != 0) {
    var first_sched_key = Object.keys(schedules)[0];
    var first_sched = schedules[first_sched_key];
    var start_date = Schedule.START_END_DAYS[first_sched.semester][0];
    scheduler.init('scheduler_here', new Date(start_date), "week");
    Schedule.displaySchedule(first_sched, scheduler);
  } else {
    scheduler.init('scheduler_here', new Date(), "week");
  }
    
  // change schedule with drop down menu
  $("select").on("change", function() {
    var cur_sched = schedules[this.value];
    var start_date = Schedule.START_END_DAYS[cur_sched.semester][0];
    scheduler.setCurrentView(new Date(start_date), "week");
    Schedule.displaySchedule(cur_sched, scheduler);
  });

  // Dark mode
  $("#plusPlusMoonSchedule").click(function() {
    $("#plusPlusDarkSymbolSchedule").toggleClass("fa-moon-o fa-sun-o");
  })
});
