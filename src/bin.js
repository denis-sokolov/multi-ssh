#!/usr/bin/env node
'use strict';
/* eslint no-process-exit: 0 */

var chalk = require('chalk');
var cycle = require('cycle-values');

var parseArgs = require('./args');
var multiSsh = require('.');

var color = cycle([
	chalk.magenta, chalk.cyan, chalk.green,
	chalk.blue, chalk.yellow, chalk.gray
]);

var output = function(colorify, server, data){
	process.stdout.write(
		data.trim().split('\n').map(function(line, i){
			var prefix = i === 0 ? server + ':' : ' '.repeat(server.length + 1);
			return colorify(prefix + ' ' + line);
		}).join('\n') + '\n'
	);
};

var args;
try {
	args = parseArgs(process.argv.slice(2));
} catch (err) {
	process.stderr.write('Error: ' + err.message + '\n');
	process.stderr.write('Usage: multi-ssh server1 server2 -- command with parameter\n');
	process.exit(2);
}
multiSsh(args.servers, args.command)
	.on('step', function(server, stdout){
		output(color(), server, stdout);
	})
	.on('step-error', function(server, stderr){
		output(chalk.red, server, stderr);
	})
	.on('error', function(err){
		throw err;
	});
