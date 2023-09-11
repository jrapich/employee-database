require('dotenv').config();
const inquirer = require("inquirer");
const mysql = require("mysql2");
const {printTable} = require("console-table-printer");

const inquireData = {
    landing: {
        type:"list",
        name:"selection",
        message:"Pick an action:",
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
    renderDepts: function(){
        db.query("SELECT * FROM department", (err, result)=>{
            printTable(result);
        });
    },
    renderRoles: function(){
        db.query("SELECT * FROM role", (err, result)=>{
            printTable(result);
        });
    },
    renderEmployees: function(){
        db.query(
            `SELECT 
                employee.id AS ID, employee.first_name AS first_name, employee.last_name AS last_name, role.title, role.salary, department.department_name
            FROM employee
            RIGHT JOIN role ON role.id=employee.role_id
            RIGHT JOIN department ON department.id=role.department_id
            `, (err, result)=>{
                printTable(result);
        });
    },
    addDept: function (newDept){
        db.query(`INSERT INTO department (department_name)
            VALUES
                (${newDept});`);
        console.log(`successfully saved new department ${newDept} into database.`)
    }
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
function init (){
    inquirer.prompt(inquireData.first).then(
        (answers) => {
            console.log(answers);
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
                    console.log("an unknown error has occurred");
                    break;
            }
        }
    )
}

//initialize app
init();