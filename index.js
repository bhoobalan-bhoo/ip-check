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
    
    // Print the req object as a JSON string with indentation
    const reqJsonString = JSON.stringify(req, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            // Avoid circular reference
            if (seen.includes(value)) {
                return;
            }
            seen.push(value);
        }
        return value;
    }, 2);
    
    console.log('Request Object:', reqJsonString);
    
    // Respond to the client
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
