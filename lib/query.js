require('dotenv').config();
const mysql = require("mysql2");
const {printTable} = require("console-table-printer");

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
        db.query(`INSERT INTO department (department_name) VALUE ("${newDept}");`, (err, result)=> {
            (err) ? console.log(err) : console.log(`successfully saved new department ${newDept} into database.`);
        });
    }
    addRole(roleName, salary, dept){
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
    }
    addEmployee(first, last, role){
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
    }
    updateEmployee(first, role){
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


module.exports=Query;