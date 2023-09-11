require('dotenv').config();
const mysql = require("mysql2");
//console-table-printer gives this method below to print a nice looking table to terminal
//need to make this look even better in future dev
const {printTable} = require("console-table-printer");

//connection to db, login info stored in .env file
//you will need to make your own .env file in the main folder for this to work properly
//syntax:
//  DB_NAME=""
//  DB_USER=""
//  DB_PASSWORD=""
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

class Query {
    renderDepts(){
        db.query("SELECT * FROM department", (err, result)=>{
            printTable(result);
        });
    }
    renderRoles(){
        db.query("SELECT * FROM role", (err, result)=>{
            printTable(result);
        });
    }
    renderEmployees(){
        //this will display all employees, as well as their role and department
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
    }
    addDept(newDept){
        //saving a new department name based on what the user specifies
        db.query(`INSERT INTO department (department_name) VALUE ("${newDept}");`, (err, result)=> {
            (err) ? console.log(err) : console.log(`successfully saved new department ${newDept} into database.`);
        });
    }
    addRole(roleName, salary, dept){
        //adding a new role to a department based on what the user specifies
        //switch statement here converts the department name to the department_id needed for database
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
        //the actual SQL query
        db.query(`INSERT INTO role (title, salary, department_id) VALUE ("${roleName}", "${salary}", "${roleDept}")`,
        (err, result)=>{
            (err) ? console.log(err) : console.log(`successfully saved new role ${roleName} into database.`);
        });
    }
    addEmployee(first, last, role){
        //adding a new employee by name and role
        //switch statement here is converting the user's choice into the needed role_id for the database
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
        //the actual SQL query
        db.query(`INSERT INTO employee (first_name, last_name, role_id) 
        VALUES 
            ("${first}", "${last}", "${roleID}")
        `, (err, result)=>{
            (err) ? console.log(err) : console.log(`${first} ${last} successfully added to the database.`);
        });
    }
    updateEmployee(first, role){
        //updating a current employee's role to a new one
        //switch statement logic same as above
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
    //the actual SQL query
    db.query(`UPDATE employee SET role_id = ${roleID} WHERE first_name = "${first}"`,
    (err, result)=>{
        (err) ? console.log(err) : console.log(`${first}'s role has been updated to ${role}.`);
    });
    }
}


module.exports=Query;