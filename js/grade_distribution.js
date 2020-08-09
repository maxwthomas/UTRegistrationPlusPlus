class GradeDistribution {

  // given an array of dictionaries [{name: , field: , number: , semester: , profid: , a3: , a2: , a1: , b3: , b2: , b1: , c3: , c2: , c1: , d3: , d2: , d1: , f: }, ...]
  // mulitple courses for different semesters of the same class name
  constructor(courses, professor_name) {
    this.courses = courses;
    this.course_name = courses[0]["name"];
    this.professor_name = professor_name;
  }

  // returns a dictionary {chart: , title: , subtitle: , xAxis: , yAxis: , tooltip: , plotOptions: , series: }
  getGraphFormat() {
    var series_info = [];
    for (var i = 0; i < this.courses.length; i++) {
      var semester = this.courses[i]["semester"];
      var string_grades = [this.courses[i]["a2"], this.courses[i]["a1"], 
        this.courses[i]["b3"], this.courses[i]["b2"], this.courses[i]["b1"],
        this.courses[i]["c3"], this.courses[i]["c2"], this.courses[i]["c1"],
        this.courses[i]["d3"], this.courses[i]["d2"], this.courses[i]["d1"], this.courses[i]["f"]];
      var grades = [];
      for (var j = 0; j < string_grades.length; j++) {
          grades.push(parseInt(string_grades[j], 10));
      }
      series_info.push({
          name: semester,
          data: grades
      });
    }
    var result = {
      chart: {
        type: 'column'
      },
      title: {
        text: this.course_name
      },
      subtitle: {
        text: this.professor_name
      },
      xAxis: {
        categories: [
          'A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Students'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} Students</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: series_info
    };
    return result;
  }

  // returns dictionary of format for no data
  static getNoDataFormat() {
    var result = {
      chart: {
        type: 'column'
      },
      title: {
        text: this.course_name
      },
      subtitle: {
        text: this.professor_name
      },
      xAxis: {
        categories: [
          'A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Students'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} Students</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: []
    };
    return result;
  }

  // used for debugging, displays course names
  static displayNames(courses) {
    var result = "";
    for (var i = 0; i < courses.length; i++) {
      result += (i + 1) + ": " + courses[i]["name"] + " ";
    }
    return result;
  }

  // used for debugging, displays course field and numbers
  static displayFieldAndNumbers(courses) {
    var result = "";
    for (var i = 0; i < courses.length; i++) {
      result += (i + 1) + ": " + courses[i]["field"] + courses[i]["number"] + " ";
    }
    return result;
  }

  // used for debugging, displays semesters
  static displaySemesters(courses) {
    var result = "";
    for (var i = 0; i < courses.length; i++) {
      result += (i + 1) + ": " + courses[i]["semester"] + " ";
    }
    return result;
  }

  // given courses: an array of dictionaries of courses taught by the same professor
  // and target: the specific class desired in the format "FIELDNUMBER"
  // returns an array of dictionaries of courses of a specific class
  static getCourses(courses, target) {
    var result = [];
    for (var i = 0; i < courses.length; i++) {
      var course_target = courses[i]["field"] + courses[i]["number"];
      if (course_target == target) {
          result.push(courses[i]);
      }
    }
    return result;
  }

  // given an array of dictionaries of a course with varying semesters
  // ensures there are no duplicate semesters by summing all duplicates
  // returns new array of dictionaries
  static sumDuplicateSemesters(courses) {
    // create {semester: {name: , field: , number: , semester: , profid: , a3:, ...}, semester: {}, ...}
    var semester_dict = {};
    for (var i = 0; i < courses.length; i++) {
      // semester already accounted for, sum the grades
      if (courses[i]["semester"] in semester_dict) {
        var course_dict = semester_dict[courses[i]["semester"]];
        course_dict["a3"] = parseInt(course_dict["a3"], 10) + parseInt(courses[i]["a3"], 10) + "";
        course_dict["a2"] = parseInt(course_dict["a2"], 10) + parseInt(courses[i]["a2"], 10) + "";
        course_dict["a1"] = parseInt(course_dict["a1"], 10) + parseInt(courses[i]["a1"], 10) + "";
        course_dict["b3"] = parseInt(course_dict["b3"], 10) + parseInt(courses[i]["b3"], 10) + "";
        course_dict["b2"] = parseInt(course_dict["b2"], 10) + parseInt(courses[i]["b2"], 10) + "";
        course_dict["b1"] = parseInt(course_dict["b1"], 10) + parseInt(courses[i]["b1"], 10) + "";
        course_dict["c3"] = parseInt(course_dict["c3"], 10) + parseInt(courses[i]["c3"], 10) + "";
        course_dict["c2"] = parseInt(course_dict["c2"], 10) + parseInt(courses[i]["c2"], 10) + "";
        course_dict["c1"] = parseInt(course_dict["c1"], 10) + parseInt(courses[i]["c1"], 10) + "";
        course_dict["d3"] = parseInt(course_dict["d3"], 10) + parseInt(courses[i]["d3"], 10) + "";
        course_dict["d2"] = parseInt(course_dict["d2"], 10) + parseInt(courses[i]["d2"], 10) + "";
        course_dict["d1"] = parseInt(course_dict["d1"], 10) + parseInt(courses[i]["d1"], 10) + "";
        course_dict["f"] = parseInt(course_dict["f"], 10) + parseInt(courses[i]["f"], 10) + "";
      } else {
        // semester not accounted for, use data from course dictionary
        semester_dict[courses[i]["semester"]] = {
          name: courses[i]["name"],
          field: courses[i]["field"],
          number: courses[i]["number"],
          semester: courses[i]["semester"],
          profid: courses[i]["profid"],
          a3: courses[i]["a3"],
          a2: courses[i]["a2"],
          a1: courses[i]["a1"],
          b3: courses[i]["b3"],
          b2: courses[i]["b2"],
          b1: courses[i]["b1"],
          c3: courses[i]["c3"],
          c2: courses[i]["c2"],
          c1: courses[i]["c1"],
          d3: courses[i]["d3"],
          d2: courses[i]["d2"],
          d1: courses[i]["d1"],
          f: courses[i]["f"]
        };
      }
    }
    var result = [];
    for (var semester in semester_dict) {
      result.push(semester_dict[semester]);
    }
    return result;
  }
}