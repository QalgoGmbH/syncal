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
* int() - initializes the specified interface (i.e. dom)
*/
router.get( '/syn/init', function( req, res) {		
	var synCtrl = require( './controllers/synController');
	synCtrl.init( req.query.itf, req.query.nm, req.query.pwd, res);
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
