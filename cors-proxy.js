/**
 * DocuSketch CORS Proxy Server
 * 
 * Run this locally to bypass CORS restrictions during development.
 * 
 * Usage:
 *   1. Make sure Node.js is installed
 *   2. Run: node cors-proxy.js
 *   3. Server starts at http://localhost:8080
 *   4. Update the HTML to use http://localhost:8080 as the proxy
 */

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 8080;
const TARGET_BASE = 'https://sandbox.v2docusketch.com';

const server = http.createServer((req, res) => {
    // CORS headers - allow everything for local dev
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Build target URL
    const targetUrl = TARGET_BASE + req.url;
    const parsedUrl = url.parse(targetUrl);

    console.log(`[${req.method}] ${targetUrl}`);

    // Forward request options
    const options = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.path,
        method: req.method,
        headers: {
            ...req.headers,
            host: parsedUrl.hostname
        }
    };

    // Remove headers that cause issues
    delete options.headers['origin'];
    delete options.headers['referer'];

    const proxyReq = https.request(options, (proxyRes) => {
        console.log(`  → ${proxyRes.statusCode}`);
        
        // Forward response headers
        Object.keys(proxyRes.headers).forEach(key => {
            if (key.toLowerCase() !== 'transfer-encoding') {
                res.setHeader(key, proxyRes.headers[key]);
            }
        });

        // Override CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        res.writeHead(proxyRes.statusCode);
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
        console.error('Proxy error:', err.message);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Proxy error', message: err.message }));
    });

    // Forward request body
    req.pipe(proxyReq);
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║         DocuSketch CORS Proxy Server                       ║
╠════════════════════════════════════════════════════════════╣
║  Proxy running at:  http://localhost:${PORT}                  ║
║  Target server:     ${TARGET_BASE}        ║
║                                                            ║
║  Press Ctrl+C to stop                                      ║
╚════════════════════════════════════════════════════════════╝
`);
});
