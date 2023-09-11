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
    },
    addDept: {
        type:"input",
        name:"addDept",
        message:"Please enter the name of the department you wish to add to the database:"
    },
    addRole: [
        {
            type:"input",
            name:"roleName",
            message:"Please type the name of the role you wish to add to the database:"
        },
        {
            type:"input",
            name:"salary",
            message:"Please type the salary of the role you wish to add to the database(no commas or periods):"
        },
        {
            type:"list",
            name:"dept",
            message:"Please choose the department the new role belongs to:",
            choices:[
                "Sales",
                "Human Resources",
                "Reception",
                "Warehouse",
                "Quality Assurance",
                "Accounting",
                "Administration"  
            ]
        }
    ]
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
        db.query(`INSERT INTO department (department_name) VALUE ("${newDept}");`, (err, result)=> {
            (err) ? console.log(err) : console.log(`successfully saved new department ${newDept} into database.`);
        });
    },
    addRole: function(roleName, salary, dept){
        let roleDept;
        switch (dept) {
            case "Sales":
                roleDept = 1;
                break;
            case "Human Resources":
                roleDept = 2;
                break;
            case "Reception":
                roleDept = 3;
                break;
            case "Warehouse":
                roleDept=4;
                break;
            case "Quality Assurance":
                roleDept=5;
                break;
            case "Accounting":
                roleDept=6;
                break;
            case "Administration":
                roleDept=7;
                break;
        }       
        db.query(`INSERT INTO role (title, salary, department_id) VALUE ("${roleName}", "${salary}", "${roleDept}")`,
        (err, result)=>{
            (err) ? console.log(err) : console.log(`successfully saved new role ${roleName} into database.`);
        });
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
    inquirer.prompt(inquireData.landing).then(
        (answers) => {
            console.log(answers);
            switch (answers.selection) {
                case inquireData.landing.choices[0]:
                    queryData.renderDepts();
                    break;
                case inquireData.landing.choices[1]:
                    queryData.renderRoles();
                    break;
                case inquireData.landing.choices[2]:
                    queryData.renderEmployees();
                    break;
                case inquireData.landing.choices[3]:
                    inquirer.prompt(inquireData.addDept).then((answers)=>{
                        queryData.addDept(answers.addDept);
                    });
                    break;
                case inquireData.landing.choices[4]:
                    inquirer.prompt(inquireData.addRole).then((a)=>{
                        queryData.addRole(a.roleName, a.salary, a.dept);
                    });
                    break;
                case inquireData.landing.choices[5]:
                    queryData.addEmployee();
                    break;
                case inquireData.landing.choices[6]:
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