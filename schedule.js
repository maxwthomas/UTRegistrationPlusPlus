// class to represent a schedule for a student
class Schedule {

    constructor(semester) {
        this.semester = semester;
        this.courses = [];
    }

    // given course object, adds course to the schedule
    addCourse(course) {
        this.courses.push(course);
    }

    // removes a course from the schedule
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
        }
        if (swapped) {
            this.courses.pop();
        }
    }

    // removes all courses from the schedule
    removeAllCourses() {
        this.courses = [];
    }

    // displays the schedule by getting information from the storage and updating the scheduler
    static displaySchedule(schedule, scheduler) {
        var sched_fall = [
            {id:1, text:"Meeting",   start_date:"07/11/2020 14:00",end_date:"07/11/2020 17:00"},
            {id:2, 
              start_date:"2020-07-03 10:00:00",
             end_date:"2020-07-13 00:00:00",
             text:"some_text",
             details:"",
             rec_type:"week_1___",
             event_length:"7200",
             event_pid:"0"}
        ];
        var sched_spring = [
            {id:1, text:"Hello",start_date:"07/15/2020 12:00",end_date:"07/18/2020 19:00"},
            {id:2, text:"Hi", start_date:"07/24/2020 09:00",end_date:"07/24/2020 10:00"},
        ];
        
        if (schedule == "fall2020") {
            scheduler.parse(sched_fall, "json");
        } else {
            scheduler.parse(sched_spring, "json");
        }
    }
}

$(document).ready(function() {
    
    // TODO: determine the starting date to display
    scheduler.init('scheduler_here', new Date(), "month");


    // get courses from storage class (dictionary {unique: course object})
    // const courses = Storage.retrieveAll(schedule);
    
    $("select").on("change", function() {
        Schedule.displaySchedule(this.value, scheduler);
    });
});