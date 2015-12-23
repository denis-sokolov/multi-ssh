'use strict';

/**
 * Parse a list of arguments
 * @param Array list Only the parameters to the command, no argv[0]
 * {
 *   servers: [],
 *   command: []
 * }
 */
module.exports = function(list){
	if (list.length < 3) {
		throw new Error('Too few arguments');
	}
	var servers = [];
	var command = [];
	var readingServers = true;
	list.forEach(function(t){
		if (!readingServers) {
			command.push(t);
			return;
		}
		if (t === '--') {
			readingServers = false;
			return;
		}
		servers.push(t);
	});
	if (servers.length === 0) {
		throw new Error('servers not given');
	}
	if (command.length === 0) {
		throw new Error('command is not given');
	}
	return {
		servers: servers,
		command: command
	};
};
