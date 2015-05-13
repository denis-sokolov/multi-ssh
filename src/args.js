'use strict';

/**
 * Parse a list of arguments, usually process.argv into
 * {
 *   servers: [],
 *   command: []
 * }
 */
module.exports = function(list){
	var servers = [];
	var command = [];
	var readingServers = true;
	list.slice(2).forEach(function(t){
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
	return {
		servers: servers,
		command: command
	};
};
