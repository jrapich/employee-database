require('dotenv').config();
const mysql = require("mysql2");
const inquirer = require("inquirer");

const inquireData = {
    first: {
        type:"list",
        name:"selection",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee"
        ]
    }
};

const queryData = {

}


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
    inquirer.prompt(inquireData.first).then(
        (answers) => {
            switch (answers.selection) {
                case inquireData.first.choices[0]:
                    queryData.renderDepts();
                    break;
                case inquireData.first.choices[1]:
                    queryData.renderRoles();
                    break;
                case inquireData.first.choices[2]:
                    queryData.renderEmployees();
                    break;
                case inquireData.first.choices[3]:
                    queryData.addDept();
                    break;
                case inquireData.first.choices[4]:
                    queryData.addRole();
                    break;
                case inquireData.first.choices[5]:
                    queryData.addEmployee();
                    break;
                case inquireData.first.choices[6]:
                    queryData.updateEmployee();
                    break;
                default:
                    console.log("an unknown error has occured");
                    break;
            }
        }
    )
})();