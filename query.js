// import jquery
var script = document.createElement('script');
script.src = '/node_modules/jquery/dist/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

/* 
 * Data is a dictionary with keys being proffesor IDs and values being an multilayered object
 * The first layer is the professor:
 * properties include name (first, middle, last), uniquer ID (generated in our db), department,
 * rmp info (score, num ratings, and tid), sexual misconduct bool, and array of courses
 * The next layer is the courses:
 * TODO
 *
 */ 
var data;
$.ajax({
	url: "utregplusplus.com/query.php",
	dataType: "json",
	method: "POST",
	// not sure about cache, will need to test
	cache: false,
	success: function(results){
		data = results;
	},
	failure: function(error){
		alert("Call to our database failed with error: " + error);
	}
});

/*
 * Returns the int id associated with professor in our database calculated from first and last name string
 * firstName: string first name of professor
 * lastName: string last name of professor
 */
function getProfID(firstName, lastName){
	// TODO some beautiful algorithm im sure ill think of later
}

/*
 * Returns a boolean based on if there is data for the given prof id
 * profID: int id associated with professor in our database
 */
function profInDatabase(profID){
	return (data[profID] ? true : false);
}

/*
 * Returns a string of the full name of the professor with the given ID
 * profID: int id associated with professor in our database
 */
function getProfFullName(profID){
	if(!profInDatabase(profID)) return null;
	var profEntry = data[profID];
	return profEntry["FirstName"] + " " + (profEntry["MiddleName"] ? profEntry["MiddleName"] + " " : "") + profEntry["LastName"];
}

/*
 * Returns a dictionary of RMP information, entries include "Score", "RatingCount", and "tid"
 * (tid is used in creating the browser link for rmp button for a professor)
 * WARNING any or all of these values could be null
 * profID: int id associated with professor in our database
 */
function getRMPInfo(profID){
	if(!profInDatabase(profID)) return null;
	var result = {};
	var profEntry = data[profID];
	result["Score"] = profEntry["RMPScore"];
	result["RatingCount"] = profEntry["RMPRatingCount"];
	result["tid"] = profEntry["RMPtid"];
	return result;
}

/*
 * Returns a string with the department assocaited with the professor id
 * profID: int id associated with professor in our database
 */
function getProfDepartment(profID){
	if(!profInDatabase(profID)) return null;
	return data[profID]["Department"];
}

/*
 * Returns a bool/string? whether or not professor has been convicted of sexual misconduct
 * profID: int id associated with professor in our database
 */
function getProfSexMiscStatus(profID){
	if(!profInDatabase(profID)) return null;
	// TODO not sure if this will return a string "true"/"false" or actual boolean
	return data[profID]["SexualMisconduct"];
}

function getGradeDist(profID, options){

}

