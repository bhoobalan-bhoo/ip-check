const http = require('http');
const requestIp = require('request-ip');

const server = http.createServer((req, res) => {
    // Get user agent
    const userAgent = req.headers['user-agent'];

    // Get IP address
    const clientIp = requestIp.getClientIp(req);

    // Log user agent and IP address
    console.log('User Agent:', userAgent);
    console.log('IP Address:', clientIp);
    
    console.log('Request Body:', req.body);
    console.log('Request Query:', req.query);
    console.log('Request Params:', req.params);
    
    // Respond to the client
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
