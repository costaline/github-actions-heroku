const path = require('path');
const express = require('express');
const favicon = require('express-favicon');
const basicAuth = require('express-basic-auth')

const port = process.env.PORT || 8080;
const app = express();

app.use(basicAuth({
  users: { [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD },
  challenge: true,
}))

app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
