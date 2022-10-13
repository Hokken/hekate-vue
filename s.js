const wwwhisper = require('connect-wwwhisper');
const express = require('express')
const app = express();

app.use(wwwhisper());

module.exports = {
     path: '/',
     handler: app
}