// Main server file

const express = require('express'); // Server framework
const helmet = require('helmet'); // HTTP security headers middleware
const morgan = require('morgan'); // HTTP logging middleware
const cors = require('cors'); // Allow cross-origin requests
const rateLimit = require('express-rate-limit'); // Rate limiting middleware
const swaggerUi = require('swagger-ui-express'); // API documentation, accessible at /api-docs
const swaggerJsdoc = require('swagger-jsdoc'); // Generates documentation from comments in the code
const path = require('path');

const routes = require('./routes'); // Importing routes from a separate folder. See routes/index.js
const frontendRoutes = require('../web/handler'); // Importing frontend routes
const { port, apiPrefix, baseURL, rateLimitIntervals, rateLimitMaxRequests, rateLimitMaxSize, node_env } = require('./config/settings'); // Importing settings
const { connect } = require('mongoose');
const connectDB = require('./db/database').connectDB; // Database connection

const swaggerOptions = {  // Options for automatic API documentation
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Engineering Expo API',
        },
        servers: [{ url: 'http://localhost:' + port }],
    },
    apis: [path.resolve(__dirname, './routes/*.js')],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

const app = express();

app.use( // Security headers. Allows these sources to load.
    helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                "script-src": ["'self'", "https:", "cdn.jsdelivr.net", "code.jquery.com", "'unsafe-inline'"],
                "style-src": ["'self'", "https:", "cdn.jsdelivr.net", "code.jquery.com", "'unsafe-inline'"],
                "connect-src": ["'self'", "https:", "cdn.jsdelivr.net", "code.jquery.com"],
                "img-src": ["'self'", "data:", "https:"],
                "font-src": ["'self'", "https:", "cdn.jsdelivr.net"],
                "object-src": ["'none'"],
                "base-uri": ["'self'"],
                "frame-ancestors": ["'none'"]
            },
        },
    })
);
app.use(morgan('combined'));
app.use(cors());
app.use(express.json({ limit: rateLimitMaxSize }));
app.use(express.urlencoded({ extended: true, limit: rateLimitMaxSize }))
app.use(rateLimit({
    windowMs: rateLimitIntervals * 60 * 1000,
    max: rateLimitMaxRequests,
    message: `Too many requests from this IP. Try again in ${rateLimitIntervals} minutes.`
}));
if (node_env === 'development') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log(`Swagger docs available at ${baseURL}/api-docs`);
}

connectDB(); // Establish database connection
app.use(apiPrefix, routes); // For all routes defined in routes/index.js; prefix with /api
app.use(frontendRoutes); // Frontend routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Base URL is set to ${baseURL}`);
    console.log(`API Prefix is set to ${apiPrefix}`);
    console.log(`Environment: ${node_env}`);
    if (node_env === 'development') {
        console.log('Running in development mode. CHANGE TO PRODUCTION IF YOU ARE IN PRODUCTION IN THE .ENV FILE!');
    }
});