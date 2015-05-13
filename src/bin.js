#!/usr/bin/env node
'use strict';

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

var args = parseArgs(process.argv);
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
