const res = require('express/lib/response');
var mySqlConnection = require('./connection-controller');

function getList() {
    var dbFetcher = function(resolve, reject) {
        var query = "select s.id,s.name,group_concat(distinct asm.artist_id) as artists_id,avg(r.rating) as avg_rating from song s join as_mapping asm on s.id = asm.song_id join rating r on s.id = r.song_id group by s.id order by avg_rating desc;";
        var resultHandler = function(error, rows, fields) {
            resolve({ "data": rows});
        };
        mySqlConnection.query(query, resultHandler);
    };
    return new Promise(dbFetcher);
}

function create(req){
    var name = req.body.song;
    var year = req.body.year;
    var dbFetcher = function(resolve, reject){
        var query = "INSERT INTO song(name,year) values (?,?)";
	    var resultHandler = function(error, meta, fields){
            if (error){
                console.log(error);
            }
		    resolve(meta);
	    };
	    mySqlConnection.query(query ,[name, year],resultHandler);
    }
    return new Promise(dbFetcher);
}

function getSong(id){
    var dbFetcher = function(resolve, reject){
        var query  = "select s.name, s.year,  (select group_concat(distinct a.name order by a.id) from as_mapping asm join artist a on (a.id=asm.artist_id) where asm.song_id = s.id) as artistsId,(select avg(ur.rating) from u_rating ur where ur.song_id = s.id) as rating from song s where s.id=?;";
        var resultHandler = function(error, rows, fields){
            resolve(rows[0]);
        }
        mySqlConnection.query(query, id, resultHandler);
    }
    return new Promise(dbFetcher);
}

module.exports = {
    getList,
    create,
    getSong
}

