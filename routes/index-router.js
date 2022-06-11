var express = require('express');
var router = express.Router();
var mySqlConnection = require('../services/connection-controller');

router.get('/', function(req, res, next) {
  res.send('Spotify Lite')
}
);

module.exports = router;
