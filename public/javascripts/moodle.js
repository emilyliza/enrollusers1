
// $(document).ready(function() {
var moodleUser = function(data){

    var data = data.data;
		var token = '0f8d330935d406d2409217744a6f8241';
		var domainname = 'https://intensive.pachamama.org';
		var createuser = 'core_user_create_users';
		var updateuser = 'core_user_update_users';
		var getuser = 'core_user_get_users_by_field';
		var addcohortmember = 'core_cohort_add_cohort_members';
		var userId;
		var serverurl = domainname + '/sandbox/webservice/rest/server.php';
		var getuserurl = domainname + '/sandbox/webservice/rest/server.php?wstoken=0f8d330935d406d2409217744a6f8241&wsfunction=core_user_get_users_by_field&field=username&values[0]=' + data.email;

		//User object array (create new or update existing)
		var userstocreate = [{
			username: data.email,
			password: 'changeme',
			firstname: data.firstname,
			lastname: data.lastname,
			email: data.email,
			preferences: [{type: 'auth_forcepasswordchange', value: true }]
		}];

    console.log("the users to create object;", userstocreate);

		//Make the api call to see if user exists
		var response = $.ajax({
			type: 'POST',
			dataType: 'xml',
			url: getuserurl,
			complete: function(res) {

				var xml = res.responseText;
				var xmlDoc = $.parseXML(xml);
				var jsonData = xmlToJson(xmlDoc);

				try {
					if (jsonData['RESPONSE']['MULTIPLE']['SINGLE']['KEY']) {
						var getUserId = jsonData['RESPONSE']['MULTIPLE']['SINGLE']['KEY'];
						userId = getUserId[0]['VALUE'];
						updateUser(userId);
					}
				} catch(e) {
					console.log("we don't have the data", e);
					addNewUserstoMoodle();
				}
			}
		});
		console.info(response);

		function addNewUserstoMoodle(){
			var dataNew = {
				wstoken: token,
				wsfunction: createuser,
				moodlewsrestformat: 'json',
				users: userstocreate
			}

			var response = $.ajax({
				type: 'POST',
				data: dataNew,
				url: serverurl,
				complete: function(res) {
					var json = JSON.parse(res.responseText);
					userId = json[0].id;
					addUserToCohort(userId);
					if (json.debuginfo) {
						console.log("there is debug info");
						console.log(json);
					}
				}
			});
			console.info(response);
		}


	function updateUser(id) {
		userstocreate[0].id = id;
		var dataUpdate = {
			wstoken: token,
			wsfunction: updateuser,
			moodlewsrestformat: 'json',
			users: userstocreate
		}
		var response = $.ajax({
			type: 'POST',
			data: dataUpdate,
			url: serverurl,
			complete: function(res) {
				if (res.status === 200) {
					console.log("status of 200", res);
					addUserToCohort(id);
				} else {
					console.log("Oops, check for error status: ", res.status);
				}
			}
		});
		console.info(response);
	}

	function addUserToCohort(id) {
		var member = [{
			cohorttype: {type: 'idnumber', value: 'Jan2018'},
			usertype: {type: 'id', value: id}
		}];
		var data = {
			wstoken: token,
			wsfunction: addcohortmember,
			members: member,
			moodlewsrestformat: 'json',
		}
		var response = $.ajax({
			type: 'POST',
			data: data,
			url: serverurl,
			complete: function(res) {
				console.log("initial response to cohort", res);
				if (res.status === 200) {
					console.log("status of 200", res);
				} else {
					console.log("Oops, check for error status: ", res);
				}
			}
		});
	}

	function xmlToJson(xml) {
		// Create the return object
		var obj = {};

		if (xml.nodeType == 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
			obj["attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}

		// do children
		// If just one text node inside
		if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
			obj = xml.childNodes[0].nodeValue;
		}
		else if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item));
				}
			}
		}
		return obj;
	}
}
// });
