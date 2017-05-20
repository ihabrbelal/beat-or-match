var mysql = require("mysql");

var connection;

var JAWSDB_URL = "mysql://zhjfgifgk712xaou:p6tilh0efzx9j5zo@vvfv20el7sb2enn3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/hg7anv85qr3gmo6u"




if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "beatormatch_db"
    });
};

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);

});



module.exports = connection;
