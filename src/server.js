// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const messageController = require('./controllers/messageController');
const app = express();

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes using the controller functions
app.get('/hello', messageController.getGreeting);
app.get('/messages', messageController.getAllMessages);
app.post('/message', messageController.createMessage);
app.put('/message/:id', messageController.updateMessage);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
