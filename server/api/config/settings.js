require("dotenv").config(); // Getting settings from .env file

module.exports = {
  port: process.env.PORT || 8080,
  apiPrefix: "/api",
  baseURL: process.env.BASE_URL || "http://localhost:" + (process.env.PORT || 8080),
  rateLimitIntervals: parseInt(process.env.RATE_LIMIT_INTERVALS) || 15, // in minutes
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000, // max requests per interval
  rateLimitMaxSize: process.env.RATE_LIMIT_MAX_SIZE || '10kb', // max size for request bodies
  node_env: process.env.NODE_ENV || 'development',
};