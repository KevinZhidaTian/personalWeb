CREATE TABLE pictures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    s3_url TEXT NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_pictures_uploaded_at ON pictures(uploaded_at DESC);

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    [role] TEXT,
    details JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_month TEXT NOT NULL,
    start_year INTEGER NOT NULL,
    is_present BOOLEAN,
    finish_month TEXT,
    finish_year INTEGER,
    company TEXT,
    career_level TEXT NOT NULL
);

CREATE TABLE master_reference (
    master_id INT,
    reference_id INT,
    FOREIGN KEY (master_id) REFERENCES experience(id),
    FOREIGN KEY (reference_id) REFERENCES projects(id),
    PRIMARY KEY (master_id, reference_id)
);

CREATE VIEW IF NOT EXISTS experience_projects_view AS
SELECT 
    e.id AS experience_id,
    e.company,
    e.career_level,
    e.start_year,
    e.start_month,
    e.is_present,
    e.finish_year,
    e.finish_month,
    p.id AS project_id,
    p.name AS project_name,
    p.role AS project_role,
    p.details AS project_details
FROM master_reference mr
INNER JOIN experience e ON mr.master_id = e.id
INNER JOIN projects p ON mr.reference_id = p.id;


INSERT INTO projects (id, name, role, details) VALUES
(1, 'F1 TV', 'Backend Developer', json_array('Lead developer in F1TV backend team. Worked on numerous features and optimizations for the F1TV platform, including Concurrency blocking, Real-time Subtitle, Media Pipelines, CDK migration and many more. The work I have done has significantly improved the performance and user experience of the F1TV platform, contributing to its success and growth in the market.'));
INSERT INTO experience (id, start_month, start_year, is_present, finish_month, finish_year, company, career_level) VALUES
(1, 'November', 2022, TRUE, NULL, NULL, 'Accenture', 'Application Development Specialist');
INSERT INTO master_reference (master_id, reference_id) VALUES
(1, 1);

INSERT INTO projects (id, details) VALUES
(2, json_array('Working in ramen section the kitchen to prepare food for customers'));
INSERT INTO experience (id, start_month, start_year, is_present, finish_month, finish_year, company, career_level) VALUES
(2, 'May', 2022, FALSE, 'June', 2022, 'Wagamama', 'Line Chef');
INSERT INTO master_reference (master_id, reference_id) VALUES
(2, 2);

INSERT INTO projects (id, details) VALUES
(3, json_array('Serving alcohol to clients'));
INSERT INTO experience (id, start_month, start_year, is_present, finish_month, finish_year, company, career_level) VALUES
(3, 'September', 2021, FALSE, 'February', 2022, 'BarPop', 'Bartender');
INSERT INTO master_reference (master_id, reference_id) VALUES
(3, 3);

INSERT INTO projects (id, name, details) VALUES
(4, 'GAN-Based Augmentation for varied plant dataset', json_array('Explored the performance of StartGAN2 on complex plant images by transforming wheat images into different domains in the Global Wheat Dataset.'));
INSERT INTO projects (id, name, details) VALUES
(5, 'Data Modelling and Analysis of SDSS DR14 dataset', json_array('Applied data analysis, pre-processing, data mining and data classification to a slightly modified version of a real-world dataset. a slightly modified version of a real-world dataset. The dataset consists of over 10,000 observations of space taken by the SDSS. I managed to extract knowledge from the dataset and predict new results.'));
INSERT INTO experience (id, start_month, start_year, is_present, finish_month, finish_year, company, career_level) VALUES
(4, 'April', 2021, FALSE, 'September', 2021, 'University of Nottingham', 'Student');
INSERT INTO master_reference (master_id, reference_id) VALUES
(4, 4);
INSERT INTO master_reference (master_id, reference_id) VALUES
(4, 5);

INSERT INTO projects (id, name, details) VALUES
(6, 'Target Detection Web Application', json_array('Implemented an image classification web application. Used RCNN as deep learning model and deployed the trained model to a backend server based on Flask'));
INSERT INTO experience (id, start_month, start_year, is_present, finish_month, finish_year, company, career_level) VALUES
(5, 'May', 2021, FALSE, 'June', 2021, 'Hubei Minzu University', 'Student');
INSERT INTO master_reference (master_id, reference_id) VALUES
(5, 6);

INSERT INTO projects (id, details) VALUES
(7, json_array('Taking care of the wide variety of animals in the sanctuary. Maintaining the sanctuary and ensuring the safety and well-being of the animals. Assisting with feeding, cleaning, and providing enrichment activities for the animals.'));
INSERT INTO experience (id, start_month, start_year, is_present, finish_month, finish_year, company, career_level) VALUES
(6, 'March', 2022, FALSE, 'April', 2022, 'Glendrick Roost Animal Sanctuary', 'Volunteer');
INSERT INTO master_reference (master_id, reference_id) VALUES
(6, 7);

-- SELECT * FROM experience_projects_view ORDER BY start_year DESC;

