const mysql = require('mysql2');

const mysqlHost = process.env.MYSQL_HOST    || 'localhost';
const mysqlPort = process.env.MYSQL_PORT    || '3306';
const mysqlUser = process.env.MYSQL_USER    || 'lucifer';
const mysqlPass = process.env.MYSQL_PASS    || '123123';
const mysqlDB   = process.env.MYSQL_DB      || 'testdb';

const pool = mysql.createPool({
    host                : mysqlHost,
    port                : mysqlPort,
    user                : mysqlUser,
    password            : mysqlPass,
    database            : mysqlDB,
    waitForConnections  : true,
    connectionLimit     : 10,
    queueLimit          : 0
})

module.exports  = pool