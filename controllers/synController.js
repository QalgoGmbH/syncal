/**
* 
* Module:		Library
* Name:     	Syncal Synapcus controller
* Description:	Controller for interfacing the Synapcus System
* Author:       Adrian Engelmann | Qalgo GmbH
* Copyright:	Copyright 2017 by Qalgo GmbH (www.qalgo.de). All rights reserved.
*
*/

var _config = require( 'config');
var pdata = '';


/**
*   login()	- initializes the communication with the Interface System
*
*   @param itf 	- interface name
*   @param usr	- user name
*   @param pwd 	- password
*   @return 	- succes or error
*/
login = function( itf, host, mail, id, usr, pwd, res) {
	
	console.log( '--> synController.login: ' + itf);	
	
	self = this;
	self.m_itf = itf;	
	// Domino interface
	if( self.m_itf == 'dom') { 		
	    var domCtrl = require( './domController');				
		var url = domCtrl.buildUrl( host, mail, id);	
		domCtrl.login( url, usr, pwd, res);
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	}	
	
	console.log( '<-- synController.login');
}


/**
* createAppointemnt() - creates an appointment in the given interface
*
* @param summary	 	- 	short outline of the appointment's purpose
* @param location 		- 	location where the appointment takes place
* @param start:date		- 	start date of the appointment
* @param start:time 	- 	start time of the appointment
* @param end:date		- 	end date of the appointment
* @param end:time 		- 	end time of the appointment
* @param Description 	- 	description(for eg. purpose/ToDo )of the appointment
*/
createAppointment = function(req, res) {
	
	var itf = req.query.itf;
	var host =req.query.host;
	var mail =req.query.mail;
	var id =req.query.id;
		
	console.log( '--> synController.createAppointment' + itf);
		
	if( itf == 'dom') { 		
	    var domCtrl = require( './domController');				
		var url = domCtrl.buildUrl( host, mail, id);	
		domCtrl.createEvent( req, url, res);			
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	}				
	console.log( '<-- synController.createAppointment');
}


/**
* createMeeting() - creates a meeting in the given interface
*
* @param summary 		- 	Agenda of the meeting
* @param location 		- 	location where the meeting takes place
* @param start:date		- 	start date of the meeting
* @param start:time 	- 	start time of the meeting
* @param end:date		- 	end date of the meeting
* @param end:time	 	- 	end time of the meeting
* @param Required 		- 	Required participants for the meeting
* @param Optional 		- 	Optional participants for the meeting
* @param Rooms 			-	Rooms have been booked for the meeting
* @param end:time		- 	end time of the meeting
* @param Description	- 	description(for eg. purpose/ToDo )of the meeting
*/
createMeeting = function(req, itf, host, mail, id, res) {
	
	console.log( '--> synController.createMeeting');
	self = this;
	self.m_itf = itf;
	var body = "";
	req.on('data', function (data) {
		body += data;
	});
	
	req.on('end', function() {
		pdata = JSON.parse(JSON.stringify((body.toString())))        		
		res.json({ message: 'goodbye'})
	});	
	if( self.m_itf == 'dom') { 		
	    var domCtrl = require( './domController');				
		var url = domCtrl.buildUrl( host, mail, id);	
		domCtrl.createEvent( req, url, pdata, res);		
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	}
	console.log( '<-- synController.createMeeting');
}


/**
* createAllDayEvent() - creates an All Day Event in the given interface
*
* @param summary 		- Summary of the event
* @param location 		- location where the event takes place
* @param start:date		- start date of the event
* @param end:date 		- end date of the event
* @param Description 	- details(for eg. schedule)of the event
*/
createAllDayEvent = function(req, itf, host, mail, id, res) {
	
	console.log( '--> synController.createAllDayEvent');
	self = this;
	self.m_itf = itf;
	var body = "";
	req.on('data', function (data) {
		body += data;
	});
	
	req.on('end', function() {
        pdata = JSON.parse(JSON.stringify((body.toString())))        		
		res.json({ message: 'goodbye'})
	});	
	if( self.m_itf == 'dom') { 		
	    var domCtrl = require( './domController');				
		var url = domCtrl.buildUrl( host, mail, id);	
		domCtrl.createEvent( req, url, pdata, res);		
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	}
	console.log( '<-- synController.createAllDayEvent');
}


/**
* createAnniversary() - creates an Anniversary event in the given interface
*
* @param summary		- The Anniversary's name
* @param location 		- location where the Anniversary event takes place
* @param start:date 	- date of the Anniversary
* @param Description 	- details of the Anniversary event
*/
createAnniversary = function(req, itf, host, mail, id, res) {
	
	console.log( '--> synController.createAnniversary ');
	self = this;
	self.m_itf = itf;
	var body = "";
	req.on('data', function (data) {
        body += data;
	});
	
	req.on('end', function() {
        pdata = JSON.parse(JSON.stringify((body.toString())))
        //console.log(pdata);	
		res.json({ message: 'goodbye'})
	});	
	if( self.m_itf == 'dom') { 		
	    var domCtrl = require( './domController');				
		var url = domCtrl.buildUrl( host, mail, id);	
		domCtrl.createEvent( req, url, pdata, res);		
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	}
	console.log( '<-- synController.createAnniversary ');
}


/**
* createReminder() - creates a Reminder in the given interface
*
* @param summary 		- Outline of the Reminder
* @param location		- location of the event
* @param start:date		- start date of the Reminder
* @param start:time 	- start time of the Reminder
* @param Description	- description of the Reminder
*/
createReminder = function(req, itf, host, mail, id, res) {
	
	console.log( '--> synController.createReminder');
	
	self = this;
	self.m_itf = itf;
	var body = "";
	self.jsn = "";
	req.on('data', function (data) {
        body += data;
	});
	
	req.on('end', function() {
        jsn = JSON.parse(JSON.stringify((body.toString())))
        //console.log(pdata);		
		//res.json({ message: 'goodbye'})
		
	});	
	if( self.m_itf == 'dom') { 		
	    var domCtrl = require( './domController');				
		var url = domCtrl.buildUrl( host, mail, id);	
		domCtrl.createEvent( req, url, jsn, res);		
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	}
	
	console.log( '<-- synController.createReminder');
}


/**
*   getEvents() - Reads events from the calendar
*/
getEvents = function(req, res) {
	
	console.log( '--> synController.getEvents');
	
	var itf = req.query.itf;
	var host =req.query.host;
	var mail =req.query.mail;
	var id =req.query.id;	
	if( itf == 'dom') { 		
	    var domCtrl = require( './domController');				
		var url = domCtrl.buildUrl( host, mail, id);	
		domCtrl.getEvents( req, url, res);		
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	}
					
	console.log( '<-- synController.getEvents');
}


/**
*   updateEvent() - Updates a calendar event 
*/
updateEvent = function(req) {
	
	console.log( '--> synController.updateEvent');	
	
	var itf = req.query.itf;
	var host =req.query.host;
	var mail =req.query.mail;
	var id =req.query.id;		
	if( itf == 'dom') { 		
	    var domCtrl = require( './domController');				
		var url = domCtrl.buildUrl( host, mail, id);			
		domCtrl.updateEvent( req, url);	
		
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	} 	
	
	console.log( '<-- synController.updateEvent');
}


/**
*   deleteEvent() - 	Deletes a calendar event 
*/
deleteEvent = function(req) {
	
	console.log( '--> synController.deleteEvent');
	
	var itf = req.query.itf;
	var host =req.query.host;
	var mail =req.query.mail;
	var id =req.query.id;		
	if( itf == 'dom') { 		
	    var domCtrl = require( './domController');				
		var url = domCtrl.buildUrl( host, mail, id);	
		domCtrl.deleteEvent( req, url);		
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	} 				
	
	console.log( '<-- synController.deleteEvent');
}


/**
*  Module interface
*/
module.exports = {
	login: login,
	createAppointment: createAppointment,
	createMeeting: createMeeting,
	createAllDayEvent: createAllDayEvent,
	createAnniversary: createAnniversary,
	createReminder:	createReminder,
	getEvents: getEvents,
	updateEvent: updateEvent,
	deleteEvent: deleteEvent
    
}