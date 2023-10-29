// create web server, and listen on port 3000
var http = require('http');
var server = http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/plain'});
 res.end('Hello World\n');
});
server.listen(3000, '
