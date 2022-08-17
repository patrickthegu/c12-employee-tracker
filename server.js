// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');

const view = require('./utils/view');
const add = require('./utils/add');
const update = require('./utils/update');
// const remove = require('./utils/remove');

const PORT = process.env.PORT || 3001;
const app = express();

// Connect mysql2
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "p@ssword",
        database: "employee_db"
    },
    console.log(`connected to employee database`)
);


// Questions on start

const startQuestions = [
    {
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
            "EXIT"
        ]  
    }
];

db.connect(function(err) {
    if (err) throw err;
    console.log (err);
});

// Init function prompts user with options to choose from and executes their associated functions
function init() {
    inquirer.prompt(startQuestions)
    .then((answer) => {
        switch(answer.options){
        case "view all departments":
            console.table(view.departments(db));
            init();
            break;
        case "view all roles":
            console.table(view.roles(db));
            init();
            break;
        case "view all employees":
            console.table(view.employees(db));
            init();
            break;
        case "add a department":
            add.department(db);
            init();
            break;    
        case "add a role":
            add.role(db);
            init();
            break;
        case "add an employee":
            add.employee(db);
            init();
            break;    
        case "update an employee":
            update.employee(db);
            init();
            break;
        case "EXIT":
            db.end();
            break;
    }})
};

init();