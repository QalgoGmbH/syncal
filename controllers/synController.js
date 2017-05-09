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


/**
*   login() - initializes the communication with the Interface System
*   @param itf - interface name
*   @param usr - user name
*   @param pwd - password
*   @return - succes or error
*/
login = function( itf, usr, pwd, res) {
	
	console.log( '--> synController.login: ' + itf);
	
	self = this;
	self.m_itf = itf;
	
	// Domino interface
	if( self.m_itf == 'dom') { 
		//var domCtrl = require( './controllers/domController');
		var domCtrl = require( './domController');
		domCtrl.login( usr, pwd, res);
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	}		
	
	console.log( '<-- synController.login');
}


/**
*   createAppointment() - creates an appointment in the given interface
*/
createAppointment = function( tsStart, tsEnd, sSummary, sLocation) {
	
	console.log( '--> synController.createAppointment');
	
	self = this;
	
	// Domino interface
	if( self.m_itf == 'dom') { 
		var domCtrl = require( './controllers/domController');
		domController.login();
		
		// convert timestamp dates into iso-dates required by domino
		var dtStart = new Date( tsStart);
		var dtEnd = new Date( tsEnd);
		domCtrl.createAppointement( dtStart, dtEnd, sSummary, sLocation);
		
	// Microsoft Exchange Web Services Interface
	} else if( self.m_itf == 'ews') {
		
		// ... code for Microsoft EWS
		
	}		
	
	console.log( '<-- synController.createAppointment');
}


/**
*   createMeeting() - creates an meeting in the given interface
*/
createMeeting = function( dtStart, dtEnd, sSummary, sLocation, arrAttendees) {
	
	console.log( '--> synController.createMeeting');
	
	console.log( '<-- synController.createMeeting');
}



/**
*  Module interface
*/
module.exports = {
	login: login,
	createAppointment: createAppointment,
	createMeeting: createMeeting
    
}