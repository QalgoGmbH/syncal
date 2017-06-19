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
var pdata = '';

/**
*   buildUrl() - builds the url to communicate with the Domino System
*/

buildUrl = function(host, mail, id) {
	
	console.log( '--> domController.url'); 
	
	var url = '';
	if(id == undefined || id == null)
	{
	url = "http://" + host + "/mail/" + mail + "/api/calendar/events?format=json";	
	}
	else
	{
	url = "http://" + host + "/mail/" + mail + "/api/calendar/events/" + id;	
	}
	console.log( 'The id is: ' + id);
	console.log( 'The URL is: ' + url);
	return url;
	
	console.log( '<-- domController.url');
}

/**
*   login() - initiazes the communication with the Domino System
*/
login = function(url, usr, pwd, res) {
	
	console.log( '--> domController.login'); 	
	
	//Basic authentication	
	var auth = "Basic " + new Buffer(usr + ":" + pwd).toString("base64");
	//var url = "http://dev.qalgo.de/mail/bchiruma.nsf/api/calendar/events?format=json";
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
				console.log('body : ', body);
				console.log('login is successfull');
				res.send(body);	
				//res.json({ message: 'login success'})
			});
			
	console.log( '<-- domController.login');
	
}


/**
* createEvents() - creates an Anniversary event in the given interface
* @Variable pdata - Contains the json data for creating an event(E.g. Meeting, Appointment, Reminder etc.)
*/
createEvent = function(req, url, res) {
	
	console.log( '--> domController.createEvent'); 
	
	try {	
	var body = "";		
	req.on('data', function (data) {
        body += data;
	});
	
	req.on('end', function() {
		pdata = JSON.parse(JSON.stringify((body.toString())));
        console.log('-->json @ domController' + pdata + '<--json @ domController');	
		console.log( 'Cookie from synapcus:'+ req.headers.cookie);			
	var postConfig = { 
		url: url, 
		method: "POST", 
		rejectUnauthorized: false,        	
		headers: { 
			"Content-type": "application/json",
			"Cookie": req.headers.cookie	
			//"Content-type": "application/x-www-form-urlencoded",			
			//"Cookie": sessId					
		},      
		body: pdata	
	}; 
	request(postConfig, function(err, httpResponse, body) { 
		console.log( 'error' + err);
		console.log( 'httpResponse' + httpResponse);
		console.log( 'body' + body); 
		var mtid = '';
		try {
		var bd = JSON.parse( body);
		console.log( 'body' + bd.events[0].id);
		mtid = bd.events[0].id;
		} catch( e) {
			console.log( e);
		}		
		res.json({sac_syncal_objid: mtid, sac_syncal_itf: 'dom'})				
	})	
	});	
		} catch( e) {
			console.log( e);
		}
		
	console.log( '<-- domController.createEvent');
}


/**
*   getEvents() - Reads events from the calendar
*/
getEvents = function( req, url, res) {	

	console.log( '--> domController.get');	
	
	request.get( {
		url : url,
		headers: { 		
			"Cookie": req.headers.cookie
			//"Cookie": sessId				
		},
	}, function(error, response, body) {      
			res.send(body); 
			console.log('body' , body);
			//console.log('response:' , response);
			console.log('error:' , error);
			console.log('hiiiiiii');
	}); 
	
	console.log( '<-- domController.get');
	
}


/**
*   updateEvent() - Updates a specified event from the calendar
*/
updateEvent = function( req, url, res) {	

	console.log( '--> domController.updateEvent');	
	
	var body = "";		
	req.on('data', function (data) {        
		body += data;		
	});	
	req.on('end', function() {
		pdata = JSON.parse(JSON.stringify((body.toString())));
        console.log('-->json @ domController' + pdata + '<--json @ domController');	
		console.log( 'Cookie from synapcus:'+ req.headers.cookie);
		
		var postConfig = { 
		url: url, 
		method: "PUT", 
		rejectUnauthorized: false,        	
		headers: { 
			"Content-type": "application/json",
			"Cookie": req.headers.cookie					
		},      
		body: pdata	
	}; 
	request(postConfig, function(err, httpResponse, body) { 
		console.log( 'error' + err);
		console.log( 'httpResponse' + httpResponse);
		console.log( 'body' + body); 			
	}) 					
	}); 		
	
	console.log( '<-- domController.updateEvent');	
}


/**
*   deleteEvent() - Deletes a specified event from the calendar
*/
deleteEvent = function( req, url) {
	
	console.log( '--> domController.delete');	
	
	request.del( {
		url : url,
		headers: { 		
			"Cookie": req.headers.cookie					
		},
	}, function(error, response, body) {      
			console.log( 'error' + error);
			console.log( 'httpResponse' + response);
			console.log( 'body' + body);
	}); 
	
	console.log( '<-- domController.delete');
}


/**
*  Module interface
*/
module.exports = {
	buildUrl:buildUrl,
	login: login,
	createEvent: createEvent,
	getEvents: getEvents,
	deleteEvent:deleteEvent,
	updateEvent:updateEvent
}