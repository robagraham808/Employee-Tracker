const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "department_db",
});

async function queryRoles() {
    return new Promise((resolve, reject) => {
        db.query("select * from role", function (err, results) {
            if (err) return reject(err);
            resolve(results);
        });
    });
}
async function queryEmployees() {
    return new Promise((resolve, reject) => {
        db.query("select * from employee", function (err, results) {
            if (err) return reject(err); 
            resolve(results);        
        });
    });
}
async function queryDepartments() {
        return new Promise((resolve, reject) => {
            db.query("select * from department", function (err, results) {
                if (err) return reject(err); 
                resolve(results);        
            });
        });
}

function init() {
    inquirer
        .prompt({
            name: "initialQuestion",
            type: "list",
            message: "What do you want to do?",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role",
                "EXIT",
            ],
        })
        .then((answers) => {
            switch (answers.initialQuestion) {
                case "view all departments":
                    viewAllDepartments();
                    break;
                case "view all roles":
                    viewAllRoles();
                    break;
                case "view all employees":
                    viewAllEmployees();
                    break;
                case "add a department":
                    addDepartment();
                    break;
                case "add a role":
                    addRole();
                    break;
                case "add an employee":
                    addEmployee();
                    break;
                case "update an employee role":
                    updateEmployeeRole();
                    break;
                case "EXIT":
                    db.end();
                    break;
                default:
                    break;
            }
        });
}

function viewAllDepartments() {
    db.query("select * from department", function (err, res) {
        console.log("Viewing all departments");
        console.table(res);
        init();
    });
}

function viewAllRoles() {
    db.query("select * from roles", function (err, res) {
        console.log("Viewing all roles");
        console.table(res);
        init();
    });
}

function viewAllEmployees() {
    db.query("select e1.first_name, e1.last_name, CONCAT(e2.first_name ,' ', e2.last_name) AS manager from employee e1 INNER JOIN employee e2 ON e1. manager_id = e2.id", function (err, res) {
        console.log("Viewing all employees");
        console.table(res);
        init();
    });
}

function addDepartment() {
  // ask user the department name
    inquirer
      .prompt({
        type: "input",
        name: "deptName",
        message: "what's the department name?"
      })
      .then((answer) => {
        console.log(answer.deptName);
        // db.query("INSERT INTO department (name) VALUES (?)",
        db.query(
            "INSERT INTO department SET ?",
            { name: answers.deptName },
            // [answer.deptName],
            async function (err) {
                if (err) throw err;
                const departments = await queryDepartments()
                console.table(departments);                
                init();
            }
        );
      });
    // handle user's response and add department to database
}


function addRole() {
    inquirer
      .prompt({
        type: "input",
        name: "deptName",
        message: "what's the department name?"
      })
      .then((answer) => {
        console.log(answer.deptName);
        // db.query("INSERT INTO department (name) VALUES (?)",
        db.query(
            "INSERT INTO department SET ?",
            { name: answers.deptName },
            // [answer.deptName],
            function (err) {
                if (err) throw err;
                init();
          }
        );
      });
}

async function addEmployee() {
    const roles = await queryRoles()
    const employee = await queryEmployees()
    console.log(roles);
    console.log(employees);
      inquirer
        .prompt([
          {
           name: "firstName",
           type: "input",
           message: "What's your first name?"
          },
          {
          name: "lastName",
          type: "input",
          message: "What's your last name?"
          },
          {
          name: "roleId",
          type: "list",
          message: "What's the role?",
          choices: roles.map((role) => ({ name: role.title, value: role.id }))
          },
          {
          name: "managerId",
          type: "input",
          message: "What's the manager id?"
          }
     ])
    .then((answers) => {
        db.query(
            "INSERT INTO employee SET ?",
            { 
             first_name: answers.firstName,
             last_name: answers.lastName,
             role_id: answers.roleId, 
             manager_id: answers.managerId,
            },
            // [answer.deptname],
            function (err) {
                if (err) throw err;
                init();
            }
        );
    });
}

async function updateEmployeeRole() { 
    // prompt user which employee to update
    const employee = await queryEmployees();

    inquirer.prompt([
        {
            name: "employeeToUpdate",
            message: "Which employee would you like to update?",
            type: "list",
            choices: employees.map((employee) => ({name: employee.first_name + " "  + employee.last_name, value: employee.id}))
        },
        {
            name: "roleId",
            type: "list",
            message: "What's the updated role?",
            choices: roles.map((role) => ({ name: role.title, value: role.id })),
        }
    ]).then((answers) => {
        db.query(
            "UPDATE employee SET ? WHERE ?",
        [
         { 
            role_id: answers.roleId, 
         },
         {
            id: answers.employeeToUpdate,
         },
        ],
            // [answer.deptname],
            function (err) {
                if (err) throw err;
                init();
            }
        );
    });
}

    //ask user for updated role

    //handle response and update user




init();

// function addEmployee() {
//     db.query("select * from role", function (err, res) {
//         console.log(res);
//         inquirer.prompt([
//             {
//                 name: "firstName",
//                 type: "input",
//                 message: "What's your first name?"
//             },
//             {
//                 name: "lastName",
//                 type: "input",
//                 message: "What's your last name?"
//             },
//             {
//                 name: "roleId",
//                 type: "input",
//                 message: "What's the role?",
//                 choices: res.map((role) => ({ name: role.title, value: role.id }))
//             },
//             {
//                 name: "managerId",
//                 type: "input",
//                 message: "What's the manager id?"
//             }
//         ])
//     }).then((answers) => {
//         console.log(answers);
//     })
// })

 // db.query("select * from role", function (err, res) {
    //     console.log(res);
    //     inquirer.prompt([