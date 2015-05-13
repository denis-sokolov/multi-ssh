'use strict';

var childProcess = require('child_process');

var Promise = require('Promise');

var quote = require('shell-quote').quote;

var exec = Promise.denodeify(childProcess.exec);

var api = function(args){
	return new Promise(function(resolve, reject){
		exec(quote(args), function(err, stdout, stderr){
			if (err)
				reject(new Error(stderr));
			else
				resolve(stdout);
		});
	});
};

api.ssh = function(server, args){
	return api(['ssh', '-o BatchMode=yes', server, '--'].concat(args));
};

module.exports = api;
