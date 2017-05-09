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
var usr = 'bhargavi chirumamilla';
var pwd = 'pradesh07';
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






/*var tst = exports.tst = function() {
	

var postConfig = { 
   url: "http://dev.qalgo.de/mail/bchiruma.nsf/api/calendar/events?format=icalendar", 
   method: "POST", 
   rejectUnauthorized: false, 
   json: true, 
   "auth": { 
         "user": usr, 
         "pass": pwd 
   }, 
   headers: { 
       "content-type": "application/text" 
   }, 
   body: encodeURIComponent(JSON.stringify(configObj.postData))
   
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
 
})
}*/

/**
* int() - initializes the specified interface (i.e. dom)
*/
router.get( '/syn/login', function( req, res) {	
	var synCtrl = require( './controllers/synController');
	synCtrl.login( req.query.itf, req.query.nm, req.query.pwd, res);
	
});

router.get( '/syn/createAppointment', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createAppointment( req.query.itf, req.query.start, req.query.end, res.query.summary, res.query.location, res);
});

router.get( '/syn/createMeeting', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.createMeeting( req.query.itf, req.query.nm, req.query.pwd, res);
});

app.use( '/syncal', router);

app.use( express.static( __dirname + '/public'));

var port = config.get( 'Syncal.listen.port');
console.log( '   Listening to port: ' + port);
console.log( '   Press Ctrl-C to quit.');
console.log( '>');

// start program
app.listen( port);
