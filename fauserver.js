const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can change this to your desired port

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory database (you should replace this with a real database)
const users = [];

// Define a route to create a new account
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation (you should add more checks and validation)
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  // Create a new user object (you can also hash the password)
  const newUser = {
    id: users.length + 1, // You should use a unique ID generation method
    name,
    email,
    password, // You should hash the password before storing it
  };

  // Store the user in the in-memory database
  users.push(newUser);

  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
