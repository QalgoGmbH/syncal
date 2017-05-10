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
var setcookie = '';
var token = '';
var id = '';
/**
*   login() - initiazes the communication with the Domino System
*/
login = function(usr, pwd, res) {
	console.log( '--> domController.login'); 
//GET with basic authentication	
var auth = "Basic " + new Buffer(usr + ":" + pwd).toString("base64");
var url = "http://dev.qalgo.de/mail/bchiruma.nsf/api/calendar/events?format=json";

request.get( {
    url : url,
    headers : {
        "Authorization" : auth
		
    }
  }, function(error, response, body) {
      
	 setcookie = response.headers["set-cookie"];
		if ( setcookie ) {
			setcookie.forEach(
				function ( cookiestr ) {					
				var cookiearray = cookiestr.split(';');
					for(var i =0 ; i < cookiearray.length ; ++i){ 						
						if(cookiearray[i].trim().match('^'+'DomAuthSessId'+'=')){ 							
							token = cookiearray[i].replace('DomAuthSessId=','').trim();
							console.log( 'token' + token);
							id = 'DomAuthSessId' + '=' + token;
							console.log( 'id' + id);
						}
					}	
					
				console.log( "COOKIE:" + cookiestr );
				return cookiestr;
				}
			);
		}
	 console.log('body : ', body);
	 res.send(body);
	 
 
	 
	 
  } );
  
//POST with token based authentication  
var postConfig = { 
	url: "http://dev.qalgo.de/mail/bchiruma.nsf/api/calendar/events?format=icalendar", 
	method: "POST", 
	rejectUnauthorized: false, 
	json: true, 
       
	headers: { 
		"cookie": id,
		"content-type": "application/json"		
	},
   
	body: {
	"events": [
    {
      "summary":"Appointment X",
      "location":"Location Y",
      "start": {
        "date":"2017-05-19",
        "time":"13:00:00",
        "utc":true
      },
      "end": {
        "date":"2017-05-19",
        "time":"14:00:00",
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
 
}) 

	console.log( '<-- domController.login');
}



/**
*  Module interface
*/
module.exports = {
	login: login
}