const inquirer = require('inquirer');
const view = require('./view');

function employee (db) {
    inquirer.prompt ([
        {
            type: "list",
            name: "employee",
            message: "select employee to update",
            choices: view.employees(db)
        },
        {
            type: "list",
            name: "update",
            message: "what is the employees new role",
            choices: view.roles(db)
        }
    ])
    .then ((answer) =>{
        let query = "UPDATE employees SET employees.role_id = ? WHERE employees.id = ?";
        db.query(query, [answer.update[0], answer.employee[0]], (err, result) => {
            if (err) throw err;
            console.log("employee updated");
        })
    })
};



module.exports = {
    employee: employee,
};