DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

CREATE TABLE department (
    id INTEGER NOT NULL,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department (id)
    ON DELETE SET NULL


);

CREATE TABLE employee (
    id INTEGER NOT NULL,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES role (id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee (id)
    ON DELETE SET NULL
);
