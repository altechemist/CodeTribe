import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import fs from 'fs';

// Specify the path where you want to store the SQLite database file
const DB_FILE_PATH = './database.db';
type SqlValue = string | number | null;

// Define an interface for the task object
interface Task {
    id: number;
    title: string;
    date: string;
    time: string;
    priority: string;
    status: string;
    uid: number;
}

// Check if the database file exists, create it if it doesn't
if (!fs.existsSync(DB_FILE_PATH)) {
    fs.writeFileSync(DB_FILE_PATH, Buffer.from(''));
}

// Load the database from file or create a new one if file doesn't exist
const dbBuffer = fs.readFileSync(DB_FILE_PATH);
let db: Database | undefined;

async function initializeDatabase() {
    try {
        const SQL: SqlJsStatic = await initSqlJs({ locateFile: (file) => `/${file}` });
        db = new SQL.Database(new Uint8Array(dbBuffer));

        // Create the users and tasks tables
        const createUserTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                password TEXT,
                tasks TEXT
            )
        `;

        const createTaskTable = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                date TEXT,
                time TEXT,
                priority TEXT,
                status TEXT,
                uid INTEGER,
                FOREIGN KEY(uid) REFERENCES users(id)
            )
        `;

        db.exec(createUserTable);
        db.exec(createTaskTable);
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Initialize the database schema
initializeDatabase();

// Utility function to convert TypeScript values to SQLite-compatible values
function toSqlValue(value: SqlValue | undefined): SqlValue {
    if (value === undefined) {
        return null; // SQLite treats undefined as NULL
    } else {
        return value;
    }
}

// Function to insert a new user into the database
export const AddUser = (name: SqlValue, email: SqlValue, password: SqlValue, tasks: SqlValue) => {
    if (!db) {
        throw new Error('Database is not initialized');
    }

    const sql = `
        INSERT INTO users (name, email, password, tasks)
        VALUES (?, ?, ?, ?)
    `;

    const stmt = db.prepare(sql);
    stmt.run([
        toSqlValue(name),
        toSqlValue(email),
        toSqlValue(password),
        toSqlValue(tasks)
    ]);
};

// Function to insert a new task into the tasks table
export const AddTask = (title: SqlValue, date: SqlValue, time: SqlValue, priority: SqlValue, status: SqlValue, uid: SqlValue) => {
    if (!db) {
        throw new Error('Database is not initialized');
    }

    const sql = `
        INSERT INTO tasks (title, date, time, priority, status, uid)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const stmt = db.prepare(sql);
    stmt.run([
        toSqlValue(title),
        toSqlValue(date),
        toSqlValue(time),
        toSqlValue(priority),
        toSqlValue(status),
        toSqlValue(uid)
    ]);
};

// Function to update an existing task
export const UpdateTask = (title: SqlValue, date: SqlValue, time: SqlValue, priority: SqlValue, status: SqlValue) => {
    if (!db) {
        throw new Error('Database is not initialized');
    }

    const sql = `
        UPDATE tasks
        SET title = ?, date = ?, time = ?, priority = ?, status = ?
        WHERE title = ?
    `;

    const stmt = db.prepare(sql);
    stmt.run([
        toSqlValue(title),
        toSqlValue(date),
        toSqlValue(time),
        toSqlValue(priority),
        toSqlValue(status),
        toSqlValue(title) // Using title as both SET and WHERE condition
    ]);
};

// Function to delete a task
export const DeletesTask = (title: SqlValue) => {
    if (!db) {
        throw new Error('Database is not initialized');
    }

    const sql = `
        DELETE FROM tasks
        WHERE title = ?
    `;

    const stmt = db.prepare(sql);
    stmt.run([toSqlValue(title)]);
};

// Function to retrieve all tasks for a specific user
export const RetrieveAllTasks = (uid: SqlValue): Task[] => {
    if (!db) {
        throw new Error('Database is not initialized');
    }

    const sql = `
        SELECT * FROM tasks
        WHERE uid = ?
    `;

    const stmt = db.prepare(sql);
    stmt.bind([toSqlValue(uid)]);

    const results: Task[] = [];
    while (stmt.step()) {
        const row = stmt.getAsObject() as Task;
        results.push({
            id: row.id,
            title: row.title,
            date: row.date,
            time: row.time,
            priority: row.priority,
            status: row.status,
            uid: row.uid
        });
    }

    return results;
};

// Function to close the database connection
export const CloseDatabase = () => {
    if (!db) {
        throw new Error('Database is not initialized');
    }

    // Save the database to disk before closing
    const data = db.export();
    fs.writeFileSync(DB_FILE_PATH, Buffer.from(data));
    db.close();
};
