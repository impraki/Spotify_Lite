var express = require('express');
var router = express.Router();
var user  = require('../services/user-controller');

async function getList(req, res, next) {
	res.json(await user.getList());
}

async function create(req, res, next) {
	var createMeta = await artist.create();
	req.params.id = createMeta.insertId;
	getById(req, res, next);
}

async function getById(req, res, next) {
	res.json(await user.getUser(req.params.id));
}

router.get('/', getList);

router.post('/', create);

router.get('/:id', getById);


module.exports = router;
