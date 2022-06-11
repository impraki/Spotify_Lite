var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'spotify',
  password: 'Ricky@2k22',
  database: 'spotify'
});

connection.connect((err) => {
	if(!err)
	{
		console.log("Connected");
	}
	else
	{
		throw err;
		console.log("Connection Failed");
	}


});

module.exports = connection;
