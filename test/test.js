var http = require('http');

var server = http.createServer();
server.listen(8008, (err) => {
    console.log(err)

});