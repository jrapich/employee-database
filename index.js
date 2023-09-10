require('dotenv').config();
const mysql = require("mysql2");
const inquirer = require("inquirer");


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

//inquirer v8.2.4 suite
(function (){
    inquirer.prompt([
        {
            type:
        }
    ])
})();