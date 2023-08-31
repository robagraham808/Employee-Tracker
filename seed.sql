USE department_db;
INSERT INTO department (name)
VALUES ("Sales"),
    ("HR");
INSERT INTO role (title, salary, department_id)
VALUES ("Web Developer", 100000, 1),
    ("Accountant", 80000, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Venice", "Robert", 1, 1),
    ("Karin", "Dennis", 2, 1);