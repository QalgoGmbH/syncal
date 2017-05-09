/**
* 
* Module:		Library
* Name:     	Syncal Domino controller
* Description:	Controller for interfacing the IBM Domino Calendar System
* Author:       Adrian Engelmann | Qalgo GmbH
* Copyright:	Copyright 2017 by Qalgo GmbH (www.qalgo.de). All rights reserved.
*
*/

var _config = require( 'config');
const request = require("request"); 
var http = require('http');

/**
*   login() - initiazes the communication with the Domino System
*/
login = function(usr, pwd, res) {
	console.log( '--> domController.login'); 
	
var auth = "Basic " + new Buffer(usr + ":" + pwd).toString("base64");
var url = "http://dev.qalgo.de/mail/bchiruma.nsf/api/calendar/events?format=json";

request.get( {
    url : url,
    headers : {
        "Authorization" : auth
    }
  }, function(error, response, body) {
      
	 var setcookie = response.headers["set-cookie"];
		if ( setcookie ) {
			setcookie.forEach(
				function ( cookiestr ) {
					console.log( "COOKIE:" + cookiestr );
					return cookiestr;
				}
			);
		}
	 console.log('body : ', body);
	 res.send(setcookie + body);
  } );

/*var postConfig = { 
   url: "http://dev.qalgo.de/mail/bchiruma.nsf/api/calendar/events?format=icalendar", 
   method: "POST", 
   rejectUnauthorized: false, 
   json: true, 
   
   "auth": { 
         "user": usr, 
         "pass": pwd 
   }, 
   
   headers: { 
		
       "content-type": "application/json" 
   }, 
   body: 
      
   {
  "events": [
    {
      "summary":"Appointment 2",
      "location":"Location 2",
      "start": {
        "date":"2017-05-17",
        "time":"15:00:00",
        "utc":true
      },
      "end": {
        "date":"2017-05-17",
        "time":"16:00:00",
        "utc":true
      }
    }
  ]
}

}; 

request(postConfig, function(err, httpResponse, body) { 
console.log( 'error' + err);
console.log( 'httpResponse' + httpResponse);
console.log( 'body' + body);
 
})*/

	console.log( '<-- domController.login');
}



/**
*  Module interface
*/
module.exports = {
	login: login
}