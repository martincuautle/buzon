const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : '72.167.225.210',
    user     : 'superadmin',
    password : 'yY{3g$[@![;Y',
    database: 'koonolDB'
    /*host     : '72.167.225.210',
    user     : 'buzon4tp_user',
    password : 'T-J#eNcooj^4',
    database: 'buzon4tDB'*/
  });
   
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
  module.exports=connection;