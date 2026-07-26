const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the projects page
app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects', 'index.html'));
});

// Route for the experience (Current Focus) page
app.get('/experience', (req, res) => {
    res.sendFile(path.join(__dirname, 'experience', 'index.html'));
});

// Catch-all route for 404
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
