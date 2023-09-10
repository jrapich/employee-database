INSERT INTO department (department_name)
    VALUES 
        (sales),
        (human-resources),
        (reception),
        (warehouse),
        (quality-assurance),
        (accounting),
        (administration);

INSERT INTO role (title, salary, department_id)
    VALUES
        ("sales-rep", 78.000, 1),
        ("assistant-to-regional-manager", 82.000, 1),
        ("HR-rep", 56.000, 2),
        ("receptionist", 48.000, 3),
        ("warehouse-lead", 68.000, 4),
        ("QA-rep", 62.000, 5)
        ("accountant", 65.000, 6),
        ("regional-manager", 89.000, 7);

INSERT INTO employee (first_name, last_name, role_id)
    VALUES  
        ("Jim", "Halpert", 1),
        ("Pam", "Beesley", 4),
        ("Dwight", "Shrute", 2),
        ("Michael", "Scott", 8),
        ("Kevin", "Malone", 7),
