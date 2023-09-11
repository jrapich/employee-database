INSERT INTO department (department_name)
    VALUES 
        ("sales"),
        ("human_resources"),
        ("reception"),
        ("warehouse"),
        ("quality_assurance"),
        ("accounting"),
        ("administration");

INSERT INTO role (title, salary, department_id)
    VALUES
        ("sales_rep", 78000, 1),
        ("assistant_to_regional_manager", 82000, 1),
        ("HR_rep", 56000, 2),
        ("receptionist", 48000, 3),
        ("warehouse_lead", 68000, 4),
        ("QA_rep", 62000, 5),
        ("accountant", 65000, 6),
        ("regional_manager", 89000, 7);

INSERT INTO employee (first_name, last_name, role_id)
    VALUES  
        ("Jim", "Halpert", 1),
        ("Pam", "Beesley", 4),
        ("Dwight", "Shrute", 2),
        ("Michael", "Scott", 8),
        ("Kevin", "Malone", 7)
