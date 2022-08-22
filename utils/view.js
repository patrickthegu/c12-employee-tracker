const inquirer = require('inquirer');
const cTable = require('console.table');

function employees (db) {
    let query = "SELECT * from employees";
    // "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS 'departments', roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.roles_id ORDER BY employees.id ASC";
    db.query(query, function (err, results){
        if (err) throw err;
        console.log ("Employees");
        return results;
    });
};

function departments (db) {
    let query = "SELECT * FROM departments";
    db.query(query, (err, results) => {
        if (err) throw err;
        console.log("working?");
        const table = results;
        console.table(table);
        return table;
        
    });
};

function roles (db) {
    let query = "SELECT * FROM roles";
    db.query(query, (err, results) => {
        if (err) throw err;
        return results;
    })
};

// function employeesManager (){

// };

// function employeesDepartment (){
    
// };

// function departmentBudget (){
    
// };

module.exports = {
    employees: employees,
    departments: departments,
    roles: roles
};