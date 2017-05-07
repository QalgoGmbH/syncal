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
var _ncp = require( 'ncp').ncp;
_ncp.limit = 16;


/**
*   init() - initiazes the communication with the Domino System
*/
init = function() {
	console.log( '--> domController.init');
	
	console.log( '<-- domController.init');
}

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

/**
*  Module interface
*/
module.exports = {
	init: init,
    cloneFolder: cloneFolder
}