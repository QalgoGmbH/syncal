/**
* 
* Module:	Main Program
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
* login() - Initializes the specified interface (i.e. dom)
*   Example:
*   URL: /syncal/syn/login?itf=DS name&host=hostname&mail=user mail(.nsf file)&usr=Userame&pwd=Password
*/
router.get( '/syn/login', function( req, res) {	
	var synCtrl = require( './controllers/synController');
	synCtrl.login(req.query.itf, req.query.host, req.query.mail, req.query.id, req.query.usr, req.query.pwd, res);
	
});


/**
*   createAppointment() - Creates an appointment in the given interface
*   Example:
*   URL: /syncal/syn/createAppointment?itf=DS name&host=hostname&mail=user mail(.nsf file)
*	Content type: application/json
*   Body: 
{
  "events": [
    {
      "summary":"Appointment 2",
      "location":"Location 2",
      "start": {
        "date":"2017-05-05",
        "time":"15:00:00",
        "utc":true
      },
      "end": {
        "date":"2017-05-05",
        "time":"16:00:00",
        "utc":true
      }
    }
  ]
}

*   
*/
router.post( '/syn/createAppointment', function( req, res) {

	var synCtrl = require( './controllers/synController');
	synCtrl.createAppointment(req, res);
});


/**
*   createMeeting()	- Creates a meeting in the given interface
*   Example:
*   URL: /syncal/syn/createMeeting?itf=[DS without brackets]&host=hostname&mail=user mail(.nsf file)
*	Content type: application/json
*   Body: 
{
  "x-lotus-charset": {
    "data": "UTF-8"
  },
  "events": [
{
      "summary": "Staff meeting-test",
      "location": "At my desk",
  	  "description": "its a test meeting",	
      "start": {
        "date": "2017-05-06",
        "time": "10:00:00"
        
      },
      "end": {
        "date": "2017-05-06",
        "time": "11:00:00"
        
      },
      "class": "public",
      "transparency": "opaque",
      "sequence": 0, 	       
   "attendees": [
        {
          "role": "chair",
          "status": "needs-action",
          "rsvp": false,
          "displayName": "Bhargavi Chirumamilla/qalgo",
          "email": "bhargavi.chirumamilla@qalgo.de"
        },
        {
          "role": "req-participant",
          "status": "needs-action",
          "rsvp": true,
          "displayName": "sirisha ramireddy/qalgo",
          "email": "sirisha.ramireddy@qalgo.de"
        },
        {
          "role": "req-participant",
          "status": "needs-action",
          "rsvp": true,
          "displayName": "Kiran Jayaramu/qalgo",
          "email": "kiran.jayaramu@qalgo.de"
        }
      ],
      "organizer": {
         "displayName": "Bhargavi Chirumamilla/qalgo",
          "email": "bhargavi.chirumamilla@qalgo.de"
      },
      "x-lotus-broadcast": {
        "data": "FALSE"
      },
      "x-lotus-notesversion": {
        "data": "2"
      },
      "x-lotus-appttype": {
        "data": "3"        
    }
  }
  ]
}

*/
router.post( '/syn/createMeeting', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createMeeting(req, req.query.itf, req.query.host, req.query.mail, req.query.id, res);
});


/**
*   createAllDayEvent() - Creates an All Day Event in the given interface
*   Example:
*   URL: /syncal/syn/createAllDayEvent?itf=DS name&host=hostname&mail=user mail(.nsf file)
*	Content type: application/json
*   Body: 
{       
  "events": [
    {
      "summary":"All day in client meetings",
      "location":"Client location",
      "start": {
        "date":"2017-05-09"        
      },
      "end": {
        "date":"2017-05-09"
      }
    }
  ]
}
*/
router.post( '/syn/createAllDayEvent', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createAllDayEvent(req, req.query.itf, req.query.host, req.query.mail, req.query.id, res);
});


/**
* createAnniversary() -	Creates an Anniversary event in the given interface
*   Example:
*   URL: /syncal/syn/createAnniversary?itf=DS name&host=hostname&mail=user mail(.nsf file)
*	Content type: application/json
*   Body: 
{        
  "events": [
    {
      "summary":"Bhargavi's Birthday",
      "location":"Karlsruhe",
      "description": "Happy Birthday Baru",
      "start": {
        "date":"2017-07-13"      
      }      
    }
  ]
}
*/
router.post( '/syn/createAnniversary', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createAnniversary(req, req.query.itf, req.query.host, req.query.mail, req.query.id, res);
});


/**
* createReminder() - Creates a Reminder in the given interface
*   Example:
*   URL: /syncal/syn/createReminder?itf=DS name&host=hostname&mail=user mail(.nsf file)
*	Content type: application/json
*   Body: 
{        
  "events": [
    {
      "summary":"Make a call to souji",
      "location":"India",
      "description": "Its an important call",
      "start": {
        "date":"2017-05-07",  
        "time": "12:00:00"
      }      
    }
  ]
}
*/
router.post( '/syn/createReminder', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createReminder(req, req.query.itf, req.query.host, req.query.mail, req.query.id, res);
});


/**
* getEvents() - Reads events from the calendar
*   Example:
*   URL: /syncal/syn/getEvents?itf=DS name&host=hostname&mail=user mail(.nsf file)
*/
router.get( '/syn/getEvents', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.getEvents(req, res);
});


/**
* updateEvent() -	Updates a calendar event 
*   Example:
*   URL: /syncal/syn/updateEvent?itf=DS name&host=hostname&mail=user mail(.nsf file)&id=uniqueID of the event
*   Body: 
{       
  "events": [
    {
      "href":"/mail/bchiruma.nsf/api/calendar/events/36F8CEE87E76F1FEC125812F0054B712-Lotus_Auto_Generated",
      "id":"36F8CEE87E76F1FEC125812F0054B712-Lotus_Auto_Generated",

      "summary":"All day in client meetings",
      "location":"Client location",
      "start": {
        "date":"2017-06-09"        
      },
      "end": {
        "date":"2017-06-09"
      }
    }
  ]
}
*/
router.put( '/syn/updateEvent', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.updateEvent(req,res);		
	var oRet = {};
	oRet.operation = 'update';
	oRet.status = 'success';
	var json = JSON.stringify( oRet);
	console.log( 'status: ' + json);
	//res.send( json);
	
});


/**
* deleteEvent()	- Deletes a calendar event 
*   Example:
*   URL: /syncal/syn/deleteEvent?itf=DS name&host=hostname&mail=user mail(.nsf file)&id=uniqueID of the event
*/
router.delete( '/syn/deleteEvent', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.deleteEvent(req);
	var oRet = {};
	oRet.operation = 'delete';
	oRet.status = 'success';
	var json = JSON.stringify( oRet);
	console.log( 'status: ' + json);
	res.send( json);
});

app.use( '/syncal', router);

app.use( express.static( __dirname + '/public'));

var port = config.get( 'Syncal.listen.port');
console.log( '   Listening to port: ' + port);
console.log( '   Press Ctrl-C to quit.');
console.log( '>');

// start program
app.listen( port);
