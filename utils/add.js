const inquirer = require('inquirer');
const view = require('./view');



function department (db) {
    inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "What is the name of the new department",
                validate: answer => {
                    if (answer === ""){
                        return "no input detected"
                    }else{
                        return true;
                    }
                }
            }
        ])
    .then ((answer) => {
        let query = "INSERT INTO departments (department_name) VALUES (?)";
        db.query(query, answer.newDepartment, (err, results) => {
            if (err) throw err;
            console.log(`${answer.newDepartment} has been added`);

            console.table(view.departments(db));
        })
    });
};



function role (db) {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "what is the new role title?",
            validate: answer => {
                if (answer === ""){
                    return "enter a valid name"
                }else{
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "salary",
            message: "what is the salary of the new role?",
            validate: answer => {
                if (Number.isInteger(answer)){
                return true
                }else{
                    return "enter a valid salary";
                }
            }
        },
        {
            type: "list",
            name: "department_id",
            message: "which department is this role in",
            choices: view.departments(db)
        }
    ])
    .then ((answer) => {
        console.log(answer.department);
        let newRole = {};
        newRole.title = answer.title;
        newRole.salary = answer.salary;
        newRole.department_id = answer.department_id[0];
        let query = "INSERT INTO roles SET ?"
        db.query(query, newRole, (err, results) => {
            if (err) throw err;
            console.log(`${answer.title} has been added`);
        })
        
    })
};

function employee (db) {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "what is new employees first name?",
            validate: answer => {
                if (answer === ""){
                    return "enter a valid name"
                }else{
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "what is new employess last name?",
            validate: answer => {
                if (answer === ""){
                    return "enter a valid name"
                }else{
                    return true;
                }
            }
        },
        {
            type: "list",
            name: "role_id",
            message: "select role of new employee",
            choices: view.roles(db)
        },
        {
            type: "list",
            name: "manager",
            message: "what is new employees manager's id",
            choices: function () {
                let managerList = db.query ("SELECT id, first_name, Last_name FROM employees WHERE managers_id = NULL ORDER BY employees.id ASC")
                return managerList;
            }
        }
    ])
    .then((answer) => {
        console.log (answer.role_id);
        let newEmployee = {};
        newEmployee.first_name = answer.first_name;
        newEmployee.last_name = answer.last_name;
        newEmployee.role_id = answer.role_id[0];
        newEmployee.manager_id = answer.manager[0];
    })
};


module.exports = {
    employee: employee,
    department: department,
    role: role
};