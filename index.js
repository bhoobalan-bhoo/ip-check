const http = require('http');
const requestIp = require('request-ip');
const url = require('url');

// Function to parse query parameters
const parseQueryParams = (queryString) => {
    const params = {};
    new URLSearchParams(queryString).forEach((value, key) => {
        params[key] = value;
    });
    return params;
};

const server = http.createServer((req, res) => {
    // Get user agent
    const userAgent = req.headers['user-agent'];

    // Get IP address
    const clientIp = requestIp.getClientIp(req);

    // Parse URL and query parameters
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;

    // Log user agent and IP address
    console.log('User Agent:', userAgent);
    console.log('IP Address:', clientIp);
    
    // Log query parameters
    console.log('Request Query:', queryParams);

    // Initialize request body
    let body = '';

    // Collect the request body data
    req.on('data', chunk => {
        body += chunk.toString();
    });

    // End event when the entire body has been received
    req.on('end', () => {
        // Parse body if content-type is JSON
        if (req.headers['content-type'] === 'application/json') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.error('Invalid JSON body:', e);
            }
        }

        // Log request body
        console.log('Request Body:', body);

        // Log path parameters (example parsing)
        const pathParams = parsedUrl.pathname.split('/').filter(Boolean); // Example: ['path', 'to', 'resource']
        console.log('Request Params:', pathParams);

        // Respond to the client
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World!\n');
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
