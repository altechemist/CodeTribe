-- Creates new users table
CREATE TABLE users (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    tasks INTEGER NOT NULL
);

-- Creates new tasks table
CREATE TABLE tasks (
    tid INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    time VARCHAR(255) NOT NULL,
    priority VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    uid INTEGER,
    FOREIGN KEY (uid) REFERENCES users(uid)
);

-- Inserts a new user into the users table
INSERT INTO users (fullname, email, password, tasks)
VALUES ('John Doe', 'john.doe@example.com', 'password123', 0);

-- Inserts a new task into the tasks table
INSERT INTO tasks (title, date, time, priority, status, uid)
VALUES ('Meeting with John', '2022-12-31', '10:42', 'High', 'Incomplete', 1);

-- Updates an existing task
UPDATE tasks
SET title = 'Another Task', date = '2022-12-31', time = '11:42', priority = 'High', status = 'Incomplete'
WHERE title = 'Meeting with John';

-- Deletes a task
DELETE FROM tasks
WHERE title = 'Another Task';

-- Retrieves all tasks for a specific user
SELECT * FROM tasks
WHERE uid = 1;
