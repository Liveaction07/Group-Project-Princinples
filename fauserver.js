const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = 3000; // You can change this to your desired port

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Creates a new student object with all of its attributes.
 *     description: Use this endpoint to create a new student.
 *     parameters:
 *       - name: first_name
 *         description: Student's first name
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: last_name
 *         description: Student's last name
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: gpa
 *         description: Student's GPA
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: enrolled
 *         description: Student's enrolled status
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unable to create resource.
 *       201:
 *         description: Success. The student object has been created.
 */
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

// Swagger configuration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'User Registration API',
    version: '1.0.0',
    description: 'API for creating a new user account',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['fauserver.js'], // Replace with the filename of your Express application
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
