class Inquire {
    constructor() {
        //the main landing prompt the app will loop through
        //whichever choice the user selects will then trigger another prompt based on what is selected
        //this logic is defined on index.js
        this.landing= {
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
        this.addDept= {
            type:"input",
            name:"addDept",
            message:"Please enter the name of the department you wish to add to the database:"
        },
        this.addRole= [
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
        this.addEmployee= [
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
                //choices of roles to select to the new employee
                //in future dev this will be a dynamic list based on what roles are currently in the database
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
        this.updateEmployee= [
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
                //same as above, this list will be dynamic based on the roles in the db, for future dev
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
    }
}

module.exports = Inquire;