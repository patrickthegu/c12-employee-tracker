INSERT INTO departments (departments_name)
VALUES 
("Engineering"),
("Finance"),
("Legal"),
("Sales"),
("Research")
;

INSERT INTO roles (id, title, salary, departments_id)
VALUES 
(1, "Software Engineer", 120000, 1),
(2, "Lead Engineer", 150000, 1),
(3, "Finance Manager", 160000, 2),
(4, "Accountant", 120000, 2),
(5, "Lawyer", 190000, 3),
(6, "Paralegal", 10000, 3),
(7, "Sales Manager", 100000, 4),
(8, "Salesperson", 80000, 4),
(9, "Research Manager", 80000, 4)
;

INSERT INTO employees (id, first_name, last_name, roles_id, managers_id)
VALUES 
(1, "John", "Smith", 1, NULL),
(2, "Barry", "Campbell", 2, 1),
(3, "Digby", "Employed", 3, NULL)
;

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;