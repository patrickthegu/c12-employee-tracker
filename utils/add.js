const inquirer = require('inquirer');
const cTable = require('console.table');


// Function to add new department
async function department (db, init) {
    console.log('\n');
   await inquirer.prompt([
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
    .then (answer => {
        let query = "INSERT INTO departments (departments_name) VALUES (?)";
        db.query(query, answer.newDepartment, (err, results) => {
            if (err) throw err;
            console.log(`${answer.newDepartment} has been added`);
            init();
        })
    });
};


async function role (db, init) {
    console.log('\n');
    await inquirer.prompt([
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
            type: "number",
            name: "salary",
            message: "what is the salary of the new role?",
            validate: answer => {
                if (!isNaN(answer)){
                return true
                }else{
                    return "enter a valid salary";
                }
            }
        },
    ])
    .then ((answer) => {
        const newRole = [answer.title, answer.salary];

        db.query("SELECT * FROM departments", (err, results) => {
            if (err) throw err;
            const departmentChoices = (results.map(({id, departments_name}) => ({name: departments_name, value: id})));    
        
            inquirer.prompt([
                {
                    type: "list",
                    name: "department_id",
                    message: "which department is this role?",
                    choices: departmentChoices
                }
            ])
            .then((answer) => {
                const department_id = answer.department_id;
                newRole.push(department_id);

                let query = "INSERT INTO roles (title, salary, departments_id) VALUES (?, ?, ?) "
                db.query(query, newRole, (err, results) => {
                if (err) throw err;
                console.log(`${newRole[0]} has been added`);
                init();
                });
            });
        });            
    });
};

async function employee (db, init) {
    await inquirer.prompt([
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
        }
    ])
    .then((answer) => {
        const newEmployee = [answer.first_name, answer.last_name];

        db.query("SELECT id, title FROM roles", (err, results) => {
            if (err) throw err;
            const roleChoices = (results.map(({id, title}) => ({name: title, value: id})));
       
            inquirer.prompt([
                {
                    type: "list",
                    name: "role_id",
                        message: "select role of new employee",
                choices: roleChoices
                }
            ])
            .then(answer => {
                const role_id = answer.role_id;
                newEmployee.push(role_id);

                db.query("SELECT * FROM employees WHERE managers_id IS NULL", (err, results) => {
                    if (err) throw err;
                    const managerChoices = results.map(({id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id}));

                    inquirer.prompt([
                        {
                            type: "list",
                            name: "manager",
                            message: "what is new employees manager's id",
                            choices: managerChoices
                        }
                    ])
                    .then(answer => {
                        const managers_id = answer.manager;
                        newEmployee.push(managers_id);

                        let query = "INSERT INTO employees (first_name, last_name, roles_id, managers_id) VALUES (?, ?, ?, ?)";
                        db.query(query, newEmployee, (err, results) => {
                            if (err) throw err;
                            console.log(`${newEmployee[0]} ${newEmployee[1]} has been added`);
                            init();
                        });
                    })
                });
            });
        });
        
    })
};


module.exports = {
    employee: employee,
    department: department,
    role: role
};