const inquirer = require('inquirer');

// Function to update employee
function employee (db, init) {
    // View employees to create choices
    db.query("SELECT * FROM employees", (err, results) => {
        if (err) throw err;

        const employeesChoices = results.map(({id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id}));
        // Ask which employee to update in terminal
        inquirer.prompt([
            {
                type: "list",
                name: "updateEmployee",
                message: "Select employee to update",
                choices: employeesChoices
            }
        ])
        // Select new Role of employee and update
        .then(answer => {
            const updatedData = [];
            updatedData.push(answer.updateEmployee);
            db.query("SELECT id, title FROM roles", (err, results) => {
                if (err) throw err;
                const roleChoices = (results.map(({id, title}) => ({name: title, value: id})));
                
                inquirer.prompt([
                    {
                        type: "list",
                        name: "role_id",
                            message: "select updated role of employee",
                    choices: roleChoices
                    }
                ])
                .then(answer => {
                    updatedData.unshift(answer.role_id);
                    db.query("UPDATE employees SET roles_id = ? WHERE id = ?", updatedData, (err, results) => {
                        if (err) throw err;
                        console.log (`Employee updated`);
                        init();
                    });
                });
            });
        });
    });
};

module.exports = {
    employee: employee,
};