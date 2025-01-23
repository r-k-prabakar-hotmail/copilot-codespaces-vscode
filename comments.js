//Create web server using express
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// Set up the server to serve static files from the 'public' directory
app.use(express.static('public'));

// Set up the server to use the body-parser middleware for parsing JSON
app.use(bodyParser.json());

// Set up the server to use the body-parser middleware for parsing URL encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Use the GET method to send the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Use the POST method to log the comment to the console
app.post('/comment', (req, res) => {
    // Log the comment to the console
    console.log(req.body.comment);
    // Send a response to the client
    res.send('Comment received');
    // Write the comment to the comments.txt file
    fs.appendFile('comments.txt', req.body.comment + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
});

// Use the GET method to send the comments.txt file
app.get('/comments', (req, res) => {
    // Read the comments.txt file
    fs.readFile('comments.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        // Send the comments to the client
        res.send(data);
    });
});

// Use the DELETE method to delete the comments.txt file
app.delete('/comments', (req, res) => {
    // Delete the comments.txt file
    fs.unlink('comments.txt', (err) => {
        if (err) {
            console.log(err);
        }
    });
    // Send a response to the client
    res.send('Comments deleted');
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});