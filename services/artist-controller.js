var mySqlConnection = require('./connection-controller');

function getList() {
    var dbFetcher = function (resolve, reject){
        var query = "SELECT * from artist";
	    var resultHandler = function(err, rows, fields){
		    resolve({ "data" : rows});
	    }
	    mySqlConnection.query(query, resultHandler);
    }
    return new Promise(dbFetcher);
}

function create() {
    var dbFetcher = function(resolve, reject){
        var query = "INSERT INTO artist(name) values ('Harris')";
	    var resultHandler = function(err, meta, fields){
		    resolve(meta);
	    }
	    mySqlConnection.query(query, resultHandler);
    }
    return new Promise(dbFetcher);
}

function getArtist(id) {
    var dbFetcher = function(resolve, reject){
        var query = "SELECT * from artist where id=?";
	    var resultHandler = function(err, rows, fields){
		    resolve(rows[0]);
	    }
	    mySqlConnection.query(query, id, resultHandler);
    }
    return new Promise(dbFetcher);
}

module.exports = {
    getList,
    getArtist,
    create
}