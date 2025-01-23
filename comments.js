//create web server
const express = require('express');
const comments = require('./comments');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//parse json
app.use(bodyParser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//get comments
app.get('/comments', (req, res) => {
    res.json(comments.getComments());
});

//add comments
app.post('/comments', (req, res) => {
    const { author, text } = req.body;
    comments.addComment(author, text);
    res.status(201).end();
});

//start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});