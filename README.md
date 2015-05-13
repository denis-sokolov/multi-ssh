# multi-ssh

Run the same command on multiple servers.
Authentication is left for your ssh client, presumably your passwordless authentication is set up.

## CLI

```bash
$ multi-ssh server1 server2 -- uname -a
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
