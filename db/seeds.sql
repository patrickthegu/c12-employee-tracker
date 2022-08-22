INSERT INTO departments (departments_name)
VALUES 
("Engineering")
("Finance"),
("Legal"),
("Sales"),
("Research")
;

INSERT INTO roles (title, salary, departments_id)
VALUES 
("Software Engineer", 120000, 1),
("Lead Engineer", 150000, 1),
("Finance Manager", 160000, 2),
("Accountant", 120000, 2),
("Lawyer", 190000, 3),
("Paralegal", 10000, 3),
("Sales Manager", 100000, 4),
("Salesperson", 80000, 4),
("Research Manager", 80000, 4)
;

INSERT INTO employees (first_name, last_name, roles_id, managers_id)
VALUES 
("John", "Smith", 1, NULL),
("Barry", "Campbell", 2, 1),
("Digby", "Employed", 3, NULL)
;
