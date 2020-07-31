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

    // returns a list of [[start date, end date, length of course], ...]
    getTimeDetails() {
        
    }
}