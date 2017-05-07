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
*   init() - initializes the communication with the Interface System
*   @param itf - interface name
*   @param usr - user name
*   @param pwd - password
*   @return - succes or error
*/
init = function( itf, usr, pwd) {
	
	console.log( '--> synController.init: ' + itf);
	
	self = this;
	self.m_itf = itf;
	
	// Domino interface
	if( self.m_itf == 'dom') { 
		var domCtrl = require( './controllers/domController');
		
		domCtrl.init( usr, pwd);
	} else if( self.m_itf == 'ews') {
		// ... code for Microsoft EWS
	}		
	
	console.log( '<-- synController.init');
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

/*
cloneFolder = function( tpl, tgt, res) {

	console.log( '--> cloneFolder: ' + tpl + ' -> ' + tgt);

	var oRet = {};
	oRet.err = '0';
	oRet.txt = '';
	
	_ncp( tpl, tgt, function( err) {
		if( err) {
			oRet.err = 1;
			oRet.txt = err;
			console.error( err);			
			res.send( JSON.stringify( oRet));
			
		} else {
			console.log( "Done.");
			res.send( JSON.stringify( oRet));
		}
		
		console.log( '<-- cloneFolder');
	});			
}
*/

/**
*  Module interface
*/
module.exports = {
	init: init,
	createAppointment: createAppointment,
	createMeeting: createMeeting,
    cloneFolder: cloneFolder
}