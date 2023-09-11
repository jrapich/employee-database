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
            "Update an employee",
            "Exit"
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
    ],
    addEmployee: [
        {
            type:"input",
            name:"first",
            message:"Enter the new employee's first name:"
        },
        {
            type:"input",
            name:"last",
            message:"Enter the new employee's last name:"
        },
        {
            type:"list",
            name:"role",
            message:"Choose the new employee's role:",
            choices:[
                "sales_rep",
                "assistant_to_regional_manager",
                "HR_rep",
                "receptionist",
                "warehouse_lead",
                "QA_rep",
                "accountant",
                "regional_manager"
            ]
        }
    ],
    updateEmployee: [
        {
            type:"list",
            name:"employeeName",
            message:"Choose which employee to update:",
            choices:[
                "Jim",
                "Pam",
                "Dwight",
                "Kelly",
                "Darryl",
                "Creed",
                "Kevin",
                "Michael"
            ]
        },
        {
            type:"list",
            name:"newRole",
            message:"Choose the new role to assign the employee:",
            choices:[
                "sales_rep",
                "assistant_to_regional_manager",
                "HR_rep",
                "receptionist",
                "warehouse_lead",
                "QA_rep",
                "accountant",
                "regional_manager"
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
            ORDER BY employee.id ASC;
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
        };   
        db.query(`INSERT INTO role (title, salary, department_id) VALUE ("${roleName}", "${salary}", "${roleDept}")`,
        (err, result)=>{
            (err) ? console.log(err) : console.log(`successfully saved new role ${roleName} into database.`);
        });
    },
    addEmployee: function(first, last, role){
        let roleID;
        switch (role) {
            case "sales_rep":
                roleID = 1;
                break;
            case "assistant_to_regional_manager":
                roleID = 2;
                break;
            case "receptionist":
                roleID = 3;
                break;
            case "warehouse_lead":
                roleID=4;
                break;
            case "QA_rep":
                roleID=5;
                break;
            case "accountant":
                roleID=6;
                break;
            case "regional_manager":
                roleID=7;
                break;
        };
        db.query(`INSERT INTO employee (first_name, last_name, role_id) 
        VALUES 
            ("${first}", "${last}", "${roleID}")
        `, (err, result)=>{
            (err) ? console.log(err) : console.log(`${first} ${last} successfully added to the database.`);
        });
    },
    updateEmployee: function(first, role){
        let roleID;
        switch (role) {
            case "sales_rep":
                roleID = 1;
                break;
            case "assistant_to_regional_manager":
                roleID = 2;
                break;
            case "receptionist":
                roleID = 3;
                break;
            case "warehouse_lead":
                roleID=4;
                break;
            case "QA_rep":
                roleID=5;
                break;
            case "accountant":
                roleID=6;
                break;
            case "regional_manager":
                roleID=7;
                break;
    };
    db.query(`UPDATE employee SET role_id = ${roleID} WHERE first_name = "${first}"`,
    (err, result)=>{
        (err) ? console.log(err) : console.log(`${first}'s role has been updated to ${role}.`);
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
);

//inquirer v8.2.4 suite
function init (){

//     console.log(
//     `
// #    ______ __  __ _____  _      ______     ________ ______   _____       _______       ____           _____ ______ 
// #   |  ____|  \/  |  __ \| |    / __ \ \   / /  ____|  ____| |  __ \   /\|__   __|/\   |  _ \   /\    / ____|  ____|
// #   | |__  | \  / | |__) | |   | |  | \ \_/ /| |__  | |__    | |  | | /  \  | |  /  \  | |_) | /  \  | (___ | |__   
// #   |  __| | |\/| |  ___/| |   | |  | |\   / |  __| |  __|   | |  | |/ /\ \ | | / /\ \ |  _ < / /\ \  \___ \|  __|  
// #   | |____| |  | | |    | |___| |__| | | |  | |____| |____  | |__| / ____ \| |/ ____ \| |_) / ____ \ ____) | |____ 
// #   |______|_|  |_|_|    |______\____/  |_|  |______|______| |_____/_/    \_\_/_/    \_\____/_/    \_\_____/|______|
// #                                                                                                                   
// #                                                                                                                   

//     `
//   );

    inquirer.prompt(inquireData.landing).then(
        (answers) => {
            switch (answers.selection) {
                case inquireData.landing.choices[0]:
                    queryData.renderDepts();
                    setTimeout(()=>{init()},5000);
                    break;
                case inquireData.landing.choices[1]:
                    queryData.renderRoles();
                    setTimeout(()=>{init()},5000);
                    break;
                case inquireData.landing.choices[2]:
                    queryData.renderEmployees();
                    setTimeout(()=>{init()},5000);
                    break;
                case inquireData.landing.choices[3]:
                    inquirer.prompt(inquireData.addDept).then((answers)=>{
                        queryData.addDept(answers.addDept);
                    });
                    setTimeout(()=>{init()},5000);
                    break;
                case inquireData.landing.choices[4]:
                    inquirer.prompt(inquireData.addRole).then((a)=>{
                        queryData.addRole(a.roleName, a.salary, a.dept);
                    });
                    setTimeout(()=>{init()},5000);
                    break;
                case inquireData.landing.choices[5]:
                    inquirer.prompt(inquireData.addEmployee).then((a)=>{
                        queryData.addEmployee(a.first, a.last, a.role); 
                    });
                    setTimeout(()=>{init()},5000);
                    break;
                case inquireData.landing.choices[6]:
                    inquirer.prompt(inquireData.updateEmployee).then((a)=>{
                        queryData.updateEmployee(a.employeeName, a.newRole);
                    });
                    setTimeout(()=>{init()},5000);
                    break;
                case inquireData.landing.choices[7]:
                    console.log("farewell");
                    process.exit();
                default:
                    console.log("an unknown error has occurred");
                    setTimeout(()=>{init()},5000);
                    break;
            }
        }
    )
}

//initialize app
init();