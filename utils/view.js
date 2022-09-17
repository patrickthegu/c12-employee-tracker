const inquirer = require('inquirer');
const cTable = require('console.table');

// function to view employees 
function employees (db, init) {
    let query = "SELECT * from employees";
    // "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS 'departments', roles.salary FROM employees, roles, departments WHERE departments.id = roles.department_id AND roles.id = employees.roles_id ORDER BY employees.id ASC";
    db.query(query, function (err, results){
        if (err) throw err;
        console.log('\n');
        console.table(results);
        init();

    });
};

// function to view all department names and ids
function departments (db, init) {
    let query = "SELECT * FROM departments";
    db.query(query, (err, results) => {
        if (err) throw err;
        console.log('\n')
        console.table(results);
        init();
    });
};

// function to view all roles, showing job title, role id, department and Salary
function roles (db, init) {
    let query = "SELECT * FROM roles";
    db.query(query, (err, results) => {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        init();
    });
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