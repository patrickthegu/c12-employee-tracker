DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT,
    departments_name VARCHAR (30) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR (30) UNIQUE NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    departments_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (departments_id)
    REFERENCES departments (id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    roles_id INTEGER,
    managers_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (roles_id)
    REFERENCES roles (id)
    ON DELETE SET NULL,
    FOREIGN KEY (managers_id)
    REFERENCES employees (id)
    ON DELETE SET NULL
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;