var express = require('express');
var router = express.Router();
var rating = require('../services/rating-controller');

router.post('/',async function (req, res, next) {
    await rating.create();
    res.statusCode = 201;
    res.json();
}
)

module.exports = router;
