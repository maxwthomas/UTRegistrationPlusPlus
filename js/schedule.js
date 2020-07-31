// class to represent a schedule for a student
class Schedule {

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
            result += this.courses[i].courseName() + " ";
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
}

// dynamic class to represent a course the student could add to schedule
class Course {

    constructor(name, professor, days, times, building, unique_number, semester) {
        this.name = name;
        this.professor = professor;
        this.days = days;
        this.times = times;
        this.building = building;
        this.unique_number = unique_number;
        this.semester = semester;

        this.time_details = this.getTimeDetails();
    }

    courseName() {
        return this.name;
    }

    getSemester() {
        return this.semester;
    }

    // TODO
    // returns a list of [[start date, end date, length of course], ...]
    getTimeDetails() {
        return [
            ["2020-07-03 10:00:00", "2020-08-25 00:00:00", "7200"],
            ["2020-07-05 10:00:00", "2020-08-25 00:00:00", "7200"]
        ];
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

$(document).ready(function() {
    
    scheduler.init('scheduler_here', new Date(), "month");

    // get dictionary of courses for all semesters
    // dictionary in format {unique number: course object}
    var courses = Storage.retrieveAll();

    // create a dictionary of schedules for each unique semester
    // dictionary in format {semester: schedule object}
    var schedules = {};
    for (var key in courses) {
        var course = courses[key];
        var schedule;
        if (course.getSemester() in schedules) {
            var schedule = schedules[course.getSemester()];
        } else {
            var schedule = new Schedule(course.getSemester());
            schedules[course.getSemester()] = schedule;
        }
        schedule.addCourse(course);
    }

    // add options to drop down menu
    for (var semester in schedules) {
        var option = $("<option value='" + semester + "'></option>").text(semester);
        $("#plusPlusSemesterOptions").append(option);
    }

    // display default
    if (Object.keys(schedules).length != 0) {
        var first_sched_key = Object.keys(schedules)[0];
        var first_sched = schedules[first_sched_key];
        Schedule.displaySchedule(first_sched, scheduler);
    }
    
    // change schedule with drop down menu
    $("select").on("change", function() {
        var cur_sched = schedules[this.value];
        Schedule.displaySchedule(cur_sched, scheduler);
    });
});