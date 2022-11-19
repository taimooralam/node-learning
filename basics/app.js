const http = require('http');


const server = http.createServer((req, res ) => {
    console.log(req.url, req.method);
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>hello from my nodejs server</h1></body>');
    res.write('</html>');
    res.end();
    process.exit();
});

server.listen(3000);
