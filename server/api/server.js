// Main server file

const express = require('express'); // Server framework
const helmet = require('helmet'); // HTTP security headers middleware
const morgan = require('morgan'); // HTTP logging middleware
const rateLimit = require('express-rate-limit'); // Rate limiting middleware

const routes = require('./routes'); // Importing routes from a separate folder. See routes/index.js
const { port, apiPrefix, baseURL, rateLimitIntervals, rateLimitMaxRequests, rateLimitMaxSize, node_env } = require('./config/settings'); // Importing settings

const app = express();

app.use(helmet()); // Use Helmet to set secure HTTP headers
app.use(morgan('combined')); // Use Morgan for logging HTTP requests
app.use(express.json({ limit: rateLimitMaxSize })); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true, limit: rateLimitMaxSize })); // Parse URL-encoded request bodies
app.use(rateLimit({
    windowMs: rateLimitIntervals * 60 * 1000, // Limit each IP per ? minutes
    max: rateLimitMaxRequests, // Limit each IP to ? requests per windowMs
    message: `Too many requests from this IP. Try again in ${rateLimitIntervals} minutes.`
})); // Apply rate limiting to all requests

app.use(apiPrefix, routes); // Use the imported routes with the specified API prefix

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Base URL is set to ${baseURL}`);
    console.log(`API Prefix is set to ${apiPrefix}`);
    console.log(`Environment: ${node_env}`);
    if (node_env === 'development') {
        console.log('Running in development mode. CHANGE TO PRODUCTION IF YOU ARE IN PRODUCTION!');
    }
});