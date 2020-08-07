/*
 * A wrapper class for managing the storage of classes saved by a user in their schedule
 * All methods in this class are static, as storage for one user is already a single object
 * Ideal use of our storage area would be to use "Class" objects for classes a user can put on their schedule and store individual classes with this class.
 * This class attempts to store all items in the sync storage (https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync) however in case this is unavailable/out of storage it will store in local
 * However, the point of this wrapper class is so that users of this class don't need to worry about managing the discrepancies between local and sync storage and will just treat this class as one massive storage area
 * WARNING: internal storage is a dictionary of objects stored, given we are mostly storing courses, the best way to assign keys for each course is by their course number. This is fine for a single semester's worth of classes, but potential for problems for multiple semester's worth of courses and classes across semesters sharing same unique number. A very unlikely scenario, but something to consider.
 */

class Storage {
	// retrieves all data from local and sync storage and returns a dictionary with their key/value pairs
	static retrieveAll(){
		let result = {};
		let sync = {};
		try{
			sync = browser.storage.sync.get();
		}catch(err){
			console.log("(UTRPP) Couldn't retrieve all from sync storage: " + err);
		}
		let local = {};
		try{
			local = browser.storage.local.get();
		}catch(err){
			console.log("(UTRPP) Couldn't retrieve all from local storage: " + err);
		}
		// this order of sync first, then local, means any cases where the key is stored in both, the local value will override
		for(let key in sync){
			result[key] = sync[key];
		}
		for(let key in local){
			result[key] = local[key];
		}
		return result;
	}

	// attempts to retrieve a single value in storage based on the key, returns null if not found
	static retrieveOne(key){
		let result = null;
		try{
			result = browser.storage.sync.get(key);
		}catch(err){
			console.log("(UTRPP) Couldn't retrieve key " + key + " from sync storage: " + err);
			try{
				result = browser.storage.local.get(key);
			}catch(err){
				console.log("(UTRPP) Couldn't retrieve key " + key + " from local storage: " + err);
			}
		}
		return result;
	}

	// stores all data from the given dictionary in storage. Will return a boolean based on success/failure
	// NOTE: if any single key fails to store, no keys in the dictionary will be stored
	static storeAll(dict){
		let stored = {};
		for(let key in dict){
			if(!storeOne(key, dict[key])){
				break;
			}
			stored.push(key);
		}

		if(stored.length != dict.length){
			stored.forEach(function(value){
				Storage.clearOne(value);
			});
			return false;
		}else{
			return true;
		}
	}

	// stores the given key/value pair in storage. Will return a boolean based on success/failure
	static storeOne(key, value){
		let result = true; 
		try{
			browser.storage.sync.set({key, value}); // TODO still needs testing
		}catch(err){
			console.log("(UTRPP) Couldn't store key " + key + " in sync storage: " + err);
			try{
				browser.storage.local.set({key, value});
			}catch(err){
				console.log("(UTRPP) Couldn't store key " + key + " in local storage: " + err);
				result = false;
			}
		}
		return result;
	}

	// clears out the entire storage area (sync and local). Will return a boolean based on success/failure
	static clearAll(){
		let result = true;
		try{
			browser.storage.sync.clear();
		}catch(err){
			console.log("(UTRPP) Couldn't clear all from sync storage: " + err);
			result = false;
		}
		try{
			browser.storage.local.clear();
		}catch(err){
			console.log("(UTRPP) Couldn't clear all from local storage: " + err);
			result = false;
		}
		return result;
	}

	// clears out the key/value pair associated with the given key. Will return a boolean based on success/failure
	static clearOne(key){
		let result = true;
		try{
			browser.storage.sync.remove(key);
		}catch(err){
			console.log("(UTRPP) Couldn't clear key " + key + " from sync storage: " + err);
			result = false;
		}
		try{
			browser.storage.local.remove(key);
		}catch{
			console.log("(UTRPP) Couldn't clear key " + key + " from local storage: " + err);
			result = false;
		}
		return result;
	}
}
