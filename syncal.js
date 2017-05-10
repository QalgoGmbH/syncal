/**
* 
* Module:		Main Program
* Name:     	Syncal main entry point (start with > "node syncal.js")
* Description:	Main entry point for the SynCal Module
* Author:       Adrian Engelmann | Qalgo GmbH
* Copyright:	Copyright 2017 by Qalgo GmbH (www.qalgo.de). All rights reserved.
*               This code can be distributed, copied or changed only with the permission of Qalgo GmbH.
*
*/ 

var config = require( 'config');
var express = require( 'express');
var router = express.Router();
var app = express();
var _querystring = require('querystring');
const request = require("request");

// version
var appVer = '0.90 Beta';
var appRelease = '05.04.2017';

console.log( 'SynCal-Node, the Synapcus Calendar Synchronizator');
console.log( 'Version ' + appVer + ', released on ' + appRelease);
console.log( 'Copyright 2017 by Qalgo GmbH. All rights reserved.');


router.get( '/version', function( req, res) {		
	var oRet = {};
	oRet.version = appVer;
	oRet.release = appRelease;
	var json = JSON.stringify( oRet);
	console.log( 'version/release: ' + json);
	res.send( json);
});



/**
* login() 				- 	Initializes the specified interface (i.e. dom)
*/
router.get( '/syn/login', function( req, res) {	
	var synCtrl = require( './controllers/synController');
	synCtrl.login( req.query.itf, req.query.nm, req.query.pwd, res);
	
});

/**
*   createAppointment() - 	Creates an appointment in the given interface
*/
router.post( '/syn/createAppointment', function( req, res) {

	var synCtrl = require( './controllers/synController');
	synCtrl.createAppointment(req,res);
});

/**
*   createMeeting()		-	Creates a meeting in the given interface
*/
router.post( '/syn/createMeeting', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createMeeting(req,res);
});

/**
*   createAllDayEvent() - 	Creates an All Day Event in the given interface
*/
router.post( '/syn/createAllDayEvent', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createAllDayEvent(req,res);
});

/**
*   createAnniversary() - 	Creates an Anniversary event in the given interface
*/
router.post( '/syn/createAnniversary', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createAnniversary(req,res);
});

/**
*   createReminder()	- 	Creates a Reminder in the given interface
*/
router.post( '/syn/createReminder', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createReminder(req,res);
});

/**
*   getEvents()			- 	Reads events from the calendar
*/
router.get( '/syn/getEvents', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.getEvents(req,res);
});

/**
*   updateEvent()		- 	Updates a calendar event 
*/
router.put( '/syn/updateEvent', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.updateEvent(req,res);
});

/**
*   deleteEvent()		- 	Deletes a calendar event 
*/
router.delete( '/syn/deleteEvent', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.deleteEvent(req,res);
});


app.use( '/syncal', router);

app.use( express.static( __dirname + '/public'));

var port = config.get( 'Syncal.listen.port');
console.log( '   Listening to port: ' + port);
console.log( '   Press Ctrl-C to quit.');
console.log( '>');

// start program
app.listen( port);
