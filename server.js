// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');

const view = require('./utils/view');
const add = require('./utils/add');
const update = require('./utils/update');
// const remove = require('./utils/remove');


// Connect mysql2
const db = mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "p@ssword",
        database: "employees_db"
    },
);


// Questions on start


// db.connect(function(err) {
//     if (err) throw err;
//     console.log ("Connected");
// });

// Init function prompts user with options to choose from and executes their associated functions
async function init() {
    await inquirer.prompt([{
        type: "list",
        name: "options",
        message: "Select one of the following options",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add a department",
            "add a role",
            "add an employee",
            "update an employee",
            "exit"
        ]  
    }])
    .then((answer) => {
        switch(answer.options){
        case "view all departments":
            view.departments(db, init);
            break;
        case "view all roles":
            view.roles(db, init);
            break;
        case "view all employees":
            view.employees(db, init);
            break;
        case "add a department":
            add.department(db, init);
            break;    
        case "add a role":
            add.role(db, init);
            break;
        case "add an employee":
            add.employee(db, init);
            break;    
        case "update an employee":
            update.employee(db, init);
            break;
        case "exit":
            db.end();
            break;
    }
    })
};

init ();

// View Functions
// function to view employees 
function employees (db) {
    let query = "SELECT * from employees";
    // "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS 'departments', roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.roles_id ORDER BY employees.id ASC";
    db.query(query, function (err, results){
        if (err) throw err;
        console.log('\n');
        console.table(results);
    });
};

// function to view all department names and ids
function departments (db) {
    let query = "SELECT * FROM departments";
    db.query(query, (err, results) => {
        if (err) throw err;
        console.log('\n')
        console.table(results);
    });
};

// function to view all roles, showing job title, role id, department and Salary
function roles (db) {
    let query = "SELECT * FROM roles";
    db.query(query, (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
    });
};
