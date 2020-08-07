// dynamic class to represent a course the student could add to schedule
class Course {

  constructor(name, professor, days, times, building, unique_number, semester) {
    this._name = name;
    this.professor = professor;
    this.days = days;
    this.times = times;
    this.building = building;
    this.unique_number = unique_number;
    this._semester = semester;
  
    this.time_details = this.getTimeDetails();
  }
  
  get name() {
    return this._name;
  }
  
  get semester() {
    return this._semester;
  }
  
  // returns a list of [[start date, end date, length of course], ...]
  getTimeDetails() {
    var semester_start_date = Schedule.START_END_DAYS[this.semester][0];
    var semester_start_weekday = Schedule.START_END_DAYS[this.semester][1];
    var semester_end_date = Schedule.START_END_DAYS[this.semester][2];
  
    var json_format_day_time = [];
    var days_list = this.days.trim().split("  ");
    var times_list = this.times.trim().split("  ");
  
    for (var i = 0; i < days_list.length; i++) {
      // Determine time to start/end and length of course in seconds
      var hours = times_list[i].split("-");
      var start_time = Schedule.convertToMilitary(hours[0]);
      var end_time = Schedule.convertToMilitary(hours[1]);
      var length_seconds = Schedule.calculateSeconds(start_time, end_time);
  
      // days_group example: "MW", days_group are at same time
      var days_group = days_list[i];
      var day = 0;
      while (day < days_group.length) {
  
        // day_letter example: "M" or "W"
        var day_letter = days_group[day];
  
        // edge case: thursday
        // not last letter of days_group, is a "T" and is followed by a "H"
        if (day != days_group.length - 1 && day_letter == "T" && days_group[day + 1] == "H") {
          day_letter = "TH";
          day++;
        }
        // determine day to start
        var days_to_add;
        var weekday_value = Schedule.WEEKDAYS[day_letter];
        var sem_start_value = Schedule.WEEKDAYS[semester_start_weekday];
        if (weekday_value == sem_start_value) {
          days_to_add = 0;
        } else if (weekday_value < sem_start_value) {
          days_to_add = 7 - sem_start_value + weekday_value;
        } else {
          days_to_add = weekday_value - sem_start_value;
        }
        var semester_start_date_list = semester_start_date.split("-");
        var new_start_day = parseInt(semester_start_date_list[2], 10) + days_to_add;
        new_start_day = (new_start_day < 10) ? ("0" + new_start_day) : ("" + new_start_day);
        var start_date = semester_start_date_list[0] + "-" + semester_start_date_list[1] + "-" + new_start_day;
        start_date = Schedule.correctDate(start_date);
  
        var day_time_details = [start_date + " " + start_time, semester_end_date + " " + end_time, length_seconds];
        json_format_day_time.push(day_time_details);
        day++;
      }
    }
    return json_format_day_time;
  }
  
  // gets the json format of a course for scheduler parse method
  // returns an array due to different start/end dates and event lengths
  getJSON() {
    var json_format_array = [];
  
    for (var i = 0; i < this.time_details.length; i++) {
      var json_format = {
        id: this.unique_number + i,
        text: this.name,
        start_date: this.time_details[i][0],
        end_date: this.time_details[i][1],
        rec_type: "week_1___",
        event_length: this.time_details[i][2],
        event_pid: "0"
      }
      json_format_array.push(json_format);
    }
    return json_format_array;
  }
}