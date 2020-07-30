// class to represent a schedule for a student
class Schedule {

    constructor(semester) {
        this.semester = semester;
        this.courses = [];
    }

    // adds a course to the schedule by creating a course object and storing it
    // given course name, course time, building, unique number, and more info link
    addCourse(name, days, times, building, unique, link) {
        const query = new Query(link);
        const professor = query.fullName();
        const course = new Course(name, professor, days, times, building, unique);
        this.courses.push(course);
        Storage.storeOne(unique, course);
    }

    // removes a course from the schedule
    removeCourse(unique) {
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
        }
        if (swapped) {
            this.courses.pop();
        }
        Storage.clearOne(unique);
    }

    // removes all courses from the schedule
    removeAllCourses() {
        this.courses = [];
        Storage.clearAll();
    }

    // displays the schedule by getting information from the storage and updating the scheduler
    static displaySchedule(schedule) {
        // TODO: determine the starting date to display
        scheduler.init('scheduler_here', new Date(), "week");

        // get courses from storage class (dictionary {unique: course object})
        const courses = Storage.retrieveAll(schedule);
        
        // create a list of dictionaries of the specifics for each course
        const courses_json_format = [];
        Object.keys(courses).forEach(function(key) {
            var course_object = courses[key];
            var course_time = {id:key, text:course_object.courseName(), start_date:"", end_date:"", rec_type:"week_1___", event_length:course_object.length(), event_pid:"0"};
            courses_json_format.push(course_time);
        });
        scheduler.parse(courses_json_format, "json");
    }
}

$(document).ready(function() {
    
    scheduler.init('scheduler_here', new Date(), "month");

    var events = [
        {id:1, text:"Meeting",   start_date:"07/11/2020 14:00",end_date:"07/11/2020 17:00"},
        {id:2, text:"Conference",start_date:"07/15/2020 12:00",end_date:"07/18/2020 19:00"},
        {id:3, text:"Interview", start_date:"07/24/2020 09:00",end_date:"07/24/2020 10:00"},
        {id:4, 
          start_date:"2020-07-03 10:00:00",
         end_date:"2020-07-13 00:00:00",
         text:"some_text",
         details:"",
         rec_type:"week_1___",
         event_length:"7200",
         event_pid:"0"}
    ];

    scheduler.parse(events, "json");
});