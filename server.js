//server.js
const express = require('express'); //express variable is a fn
const cors = require('cors');
const app = express(); // app is an object (an instance of the Express application).
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // only allow this frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(express.json());  // json to js obj as express can't understand json

// Routes
const healthcareRoute = require('./src/routes/healthcareRoute');
app.use("/api/healthcare", healthcareRoute);

// Start server
app.listen(port, () => {
  console.log(`MediNest Backend running on port ${port}`);
})
