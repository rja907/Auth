// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

// App setup
app.use(morgan('combined')); // used for logging.
app.use(bodyParser.json({ type: '*/*'})); // parsing JSON requests
router(app);



// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);
