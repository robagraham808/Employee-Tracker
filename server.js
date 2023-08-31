const inquirer = require("inquirer");

const mysql = require("mysql2");

// const PORT = process.env.PORT || 3001;
// const app = inquirer();
// const { createdb } = require("mysql2");

// //middleware
// app.use(inquirer.urlencoded({ extended: false }));
// app.use(inquirer.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "department_db",
  },
  console.log(`Connected to employee_db tables database.`)
);

async function displayDepartments() {
  // TODO implement a function to select all departments from MySQL*
  // const departments = [
  //   "View Id",
  //   "View Name",
  // ]
  console.log("hey");
}
// const addEmployees = await inquirer.prompt([
//   {
//     message: "Which Employee would you like to add?",
//     employee_id: "",
//     first_name: "",
//     last_name: "",
//     job_title: "",
//     department: "",
//     salary: "",
//     Manager: "",
//   },
// ]);

// const updateEmployeeRole = await inquirer.prompt([
//   {
//     message: "Which Employee Role would you like to update?",
//     name: "",
//     type: "",
//     choices: "",
//   },
// ]);

async function handleOptions() {
  const options = [
    "View All Departments",
    "View All Roles",
    "View All Employees",
    "Add a Department",
    "Add a Role",
    "Add an Employee",
    "Update an Employee Role",
  ];
  const results = await inquirer.prompt([
    {
      message: "What would you like to do?",
      name: "command",
      type: "list",
      choices: options,
    },
    // const results = 
  ]);

  if (results.command == "View All Departments") {
    displayDepartments();
    handleOptions();

  } else if (results.command == "View All Roles") {
    // TODO handle this*
    displayRoles();
    handleOptions();
  } else if (results.command == "View All Employees") {
    displayEmployees();
    handleOptions();
  }

  // const addDepartment = await inquirer.prompt([{
  //   message: "Whats the name of the department?",
  //   name: "command",
  //   type: "options",
  // }]);

  // const addRole = await inquirer.prompt([{
  //   message: "What role would you like to add?",
  //   name: "departmentName",
  //   type: "input",
  // }]);

  // TODO implement the rest of these*
}

handleOptions();
