var mySqlConnection = require('./connection-controller');

function getList() {
    var dbFetcher = function(resolve, reject) {
        var query = "SELECT * from user";
	    var resultHandler = function(error, rows, fields) {
		    resolve({"data" : rows});
	    };
	    mySqlConnection.query(query, resultHandler);
    }
    return new Promise(dbFetcher);

}

function create() {
    var dbFetcher = function(resolve, reject) {
        var query = "INSERT INTO user(name) values ('user2')";
	    var resultHandler = function(error, rows, fields) {
		    resolve(rows);
	    };
	    mySqlConnection.query(query, resultHandler);
    }
    return new Promise(dbFetcher);
}

function getUser(id) {
    var dbFetcher = function(resolve, reject) {
        var query = "SELECT * from user where id=?";
	    var resultHandler = function(error, rows, fields) {
		    resolve(rows[0]);
	    };
	    mySqlConnection.query(query, id, resultHandler);
    }
    return new Promise(dbFetcher);
}

module.exports = {
    getList,
    create,
    getUser
}