// require your server and launch it here
const express = require('express');
const server = require('./api/server');

server.listen(8000, () => console.log('API running on port 8000'));
