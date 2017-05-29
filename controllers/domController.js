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
var sessId = '';
var bdata = '';


/**
*   login() - initiazes the communication with the Domino System
*/
login = function(usr, pwd, res) {
	console.log( '--> domController.login'); 	
	//Basic authentication	
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
									sessId = 'DomAuthSessId' + '=' + token;
									console.log( 'sessId: ' + sessId);
								}
							}					
							console.log( "COOKIE: " + cookiestr );
							return cookiestr;
						}
					);
				}
				//console.log('body : ', body);
				console.log('login is successfull');
				res.send(body);	 
			});
	console.log( '<-- domController.login');
}


/**
* createEvents() - creates an Anniversary event in the given interface
* @Variable pdata - Contains the json data for creating an event(E.g. Meeting, Appointment, Reminder etc.)
*/
createEvent = function(req, pdata, res) {
	console.log( '--> domController.createEvent'); 
	console.log( '--> pdata ' + pdata);				
	var postConfig = { 
		url: "http://dev.qalgo.de/mail/bchiruma.nsf/api/calendar/events?format=icalendar", 
		method: "POST", 
		rejectUnauthorized: false,        	
		headers: { 
			"Content-type": "application/json",
			"Cookie": sessId					
		},      
		body: pdata	
	}; 
	request(postConfig, function(err, httpResponse, body) { 
		console.log( 'error' + err);
		console.log( 'httpResponse' + httpResponse);
		console.log( 'body' + body); 
	})	
	console.log( '<-- domController.createEvent');
}


/**
*   getEvents() - Reads events from the calendar
*/
getEvents = function( req,res) {	
	var url = "http://dev.qalgo.de/mail/bchiruma.nsf/api/calendar/events?format=json";
	request.get( {
		url : url,
		headers: { 		
			"Cookie": sessId					
		},
	}, function(error, response, body) {      
		//console.log('body : ', body);	
		res.send(body); 	 	 
	}); 
}








/**
*  Module interface
*/
module.exports = {
	login: login,
	createEvent: createEvent,
	getEvents: getEvents
}