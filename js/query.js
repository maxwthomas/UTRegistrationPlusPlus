// import jquery TODO not sure if this is needed
/*var script = document.createElement('script');
script.src = '/node_modules/jquery/dist/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);*/

/* DATA LOAD AND PREPROCESS */
var professors = {};
$.ajax({
	url: "https://www.utregplusplus.com/query.php",
	dataType: "json",
	method: "POST",
	data: {
		type: "professors",
		view: "json"
	},
	success: function(results){
		professors = results;
	},
	failure: function(error){
		console.log("(UTRPP) Call to our professors database failed with error: " + error);
	}
});

var courses = {};
$.ajax({
	url: "https://www.utregplusplus.com/query.php",
	dataType: "json",
	method: "POST",
	data: {
		type: "courses",
		view: "json"
	},
	success: function(results){
		courses = results;
	},
	failure: function(error){
		console.log("(UTRPP) Call to our courses database failed with error: " + error);
	}
});

var schedule = {};
$.ajax({
	url: "https://www.utregplusplus.com/query.php",
	dataType: "json",
	method: "POST",
	data: {
		type: "schedule",
		view: "json"
	},
	success: function(results){
		schedule = results;
	},
	failure: function(error){
		console.log("(UTRPP) Call to our schedule database failed with error: " + error);
	}
});

class Lookup{
	constructor(entry){
		this.fi = entry[0];
		this.fn = entry[1];
		this.mi = entry[2];
		this.mn = entry[3];
		this.li = entry[4];
		this.ln = entry[5];
		this.id = entry[6];
	}
	static matches(lookup, firstname, middlename, lastname){
		return lookup.fn == firstname && lookup.mn == middlename && lookup.ln == lastname ? lookup.id : -1;
	}
}

var lookups = [];
$.ajax({
	url: "https://www.utregplusplus.com/query.php",
	dataType: "text",
	method: "POST",
	data: {
		type: "profids"
	},
	success: function(results){
		let lines = results.split("\n");
		lines.forEach(function(line){
			lookups.push(new Lookup(line.split(",")));
		});
	},
	failure: function(error){
		console.log("(UTRPP) Call to our professor ids database failed with error: " + error);
	}
});



/* MAIN CLASS */
class Query{
	static schedule(){
		return schedule;
	}
	/* 
	 * A Query object is the central piece for accessing our data. Construst an object with a first, middle, and last name.
	 * Middle name can be blank, but an empty string still needs to be passed. From there, a lookup will be done based on our
	 * csv of professor id's (these id's were generated by us). Whether or not an id is found, any of the methods can still be
	 * used and return default values. "found" parameter of a Query object is a boolean describing if an id was found in the lookup.
	 */
	constructor(courseLink){
		var page = null;
		$.ajax({
			type: "GET",
			url: courseLink,
			async: false,
			success: function(data){
				page = data;
			},
			failure: function(error){
				// TODO adjust to set default vals instead
				alert("Call to course link failed with error: " + error);
			}
		});

		this._textbookLink = $(page).find("a[target='_blank']").prop("href");
		this._desc = $(page).find("#details").text();

		let nameString = $(page).find("td[data-th='Instructor']").text();
		let namePieces = nameString.trim().toUpperCase().split(",");
		this.ln = namePieces[0];
		namePieces = namePieces[1].trim().split(" ");
		this.fn = namePieces[0];
		this.mn = namePieces.length > 1 ? namePieces[1] : "";
		let id = -1;
		for(let i in lookups){
			id = Lookup.matches(lookups[i], this.fn, this.mn, this.ln);
			if(id > 0) break;
		}
		this.found = id > 0;
		this.profid = id;

	}


	// Returns a string of the department or an empty string if not found
	get department(){
		return this.found ? professors[this.profid]["department"] : "";
	}

	// Returns a dictionary of RMP information with the following keys: score, ratingcount, tid, link
	get rmp(){
		var result = {};
		alert
		result["score"] = this.found ? professors[this.profid]["rmpscore"] : -1;
		result["ratingcount"] = this.found ? professors[this.profid]["rmpratingcount"] : -1;
		result["tid"] = this.found ? professors[this.profid]["rmptid"] : -1;
		result["link"] = this.found && result["tid"] > 0 ? "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + result["tid"] : "https://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+texas+at+austin&queryoption=HEADER&query=" + this.fn + "%20" + this.ln + ";&facetSearch=true";
		return result;
	}

	// Return a string link to the ecis search page for the Query
	get ecisLink(){
		return "http://utdirect.utexas.edu/ctl/ecis/results/index.WBX?&s_in_action_sw=S&s_in_search_type_sw=N&s_in_search_name=" + this.ln + "%2C%20" + this.fn;
	}

	// Returns a boolean based on if professor has been accused of sexual misconduct
	get sm(){
		return !this.found ? false : professors[this.profid]["sexualmisconduct"] == "t";
	}

	// Returns an array of course dictionaries with the following keys: name, field, number, semester, profid, a3, a2, a1, b3, b2, b1, c3, c2, c1, d3, d2, d1, f
	get courses(){
		return !this.found ? [] : courses[this.profid];
	}

	get fullName(){
		return this.fn + " " + (this.mn ? this.mn + " " : "") + this.ln;
	}

	get textbookLink(){
		return this._textbookLink;
	}

	get desc(){
		return this._desc;
	}

}
