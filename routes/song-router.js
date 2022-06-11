var express = require('express');
var router = express.Router();
var song = require('../services/song-controller');

async function getList(req, res, next) {
	res.json(await song.getList());
}

async function create(req, res, next) {
	var createMeta = await song.create(req);
	req.params.id = createMeta.insertId;
	getById(req, res, next);
}

async function getById(req, res, next) {
	res.json(await song.getSong(req.params.id));
}


router.get('/', getList );

router.post('/', create);

router.get('/:id', getById);


module.exports = router;
