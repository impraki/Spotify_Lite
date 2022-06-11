const res = require('express/lib/response');
var mySqlConnection = require('./connection-controller');

function create() {
    var dbFetcher = function(resolve, reject) {
        var query = "INSERT into u_rating(user_id, song_id, rating) values (3,1,5)";
        var resultHandler = function(error, rows, fields){
            resolve(rows);
        }
        mySqlConnection.query(query, resultHandler);
    };
    return new Promise(dbFetcher);
}

module.exports = {
    create
};