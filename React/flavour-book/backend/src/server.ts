import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
app.use(cors());
const PORT = 3001;
const JSON_FILE_PATH = path.join(__dirname, './recipes.json');

app.use(bodyParser.json());
app.use(cors());

// Route to get JSON data
app.get('/api/data', (req, res) => {
    fs.readFile(JSON_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.json(JSON.parse(data));
    });
});

// Route to update JSON data
app.post('/api/data', (req, res) => {
    fs.writeFile(JSON_FILE_PATH, JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.send('Data updated successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
