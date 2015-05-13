'use strict';

var events = require('events');

var run = require('./run');

module.exports = function(servers, command){
	var ee = new events.EventEmitter();
	Promise.all(servers.map(function(server){
		return run.ssh(server, command).then(function(stdout){
			ee.emit('step', server, stdout);
		}).then(null, function(err){
			ee.emit('step-error', server, err.message);
			return true;
		});
	})).then(function(){
		ee.emit('end');
	}).catch(function(err){
		ee.emit('error', err);
	});
	return ee;
};
