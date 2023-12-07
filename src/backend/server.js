// server.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors middleware

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Example users with roles
const users = [
  { id: 1, username: 'admin', password: 'admin', role: 'admin' },
  { id: 2, username: 'user', password: 'user', role: 'user' },
];

// Secret key for JWT
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTc4OTI4MCwiZXhwIjoxNzAxNzkyODgwfQ.QPoSh8oWGey2lFs1UJrvgYMS-h7XhLBx0bCUM77zAuk';

// Authentication route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the array (replace this with a database query)
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    // Generate a JWT token
    const token = jwt.sign({ sub: user.id, role: user.role }, secretKey, { expiresIn: '1h' });

    // Set Content-Range header (example, adjust as needed)
    res.header('Content-Range', 'users 0-1/2');

    // Return the token and user role
    res.json({ token, role: user.role });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});