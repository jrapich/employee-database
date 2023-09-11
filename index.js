const inquirer = require("inquirer");
const Inquire = require("./lib/inquire");
const Query = require("./lib/query");

const inquireData = new Inquire();
const queryData = new Query();





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