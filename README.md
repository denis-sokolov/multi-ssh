# multi-ssh

[![Code Climate](http://img.shields.io/codeclimate/github/denis-sokolov/multi-ssh.svg)](https://codeclimate.com/github/denis-sokolov/multi-ssh)
[![bitHound Score](https://app.bithound.io/denis-sokolov/multi-ssh/badges/score.svg)](http://app.bithound.io/denis-sokolov/multi-ssh)
[![Codacy Badge](https://www.codacy.com/project/badge/9b687b5bdd5640098f60da7e5e15002c)](https://www.codacy.com/app/denis-sokolov/multi-ssh)
[![Dependency Status](https://gemnasium.com/denis-sokolov/multi-ssh.svg)](https://gemnasium.com/denis-sokolov/multi-ssh)

Run the same command on multiple servers.
Authentication is left for your ssh client, presumably your passwordless authentication is set up.

## CLI

The output from various servers will be nicely colored per server.

```bash
$ multi-ssh server1 server2 -- uname -a
server1: 30973
server2: 9869
```

## API

```javascript
var multiSsh = require('multi-ssh');

multiSsh(['server1', 'server2'], ['uname', '-a'])
    .on('step', function(server, stdout){
        console.log(server, 'finished with', stdout);
    })
    .on('step-error', function(server, stderr){
        console.warn(server, 'failed with', stderr);
    })
    .on('error', function(err){
        throw err;
    })
    .on('end', function(){
        console.log('Everybody done.');
    });
```
