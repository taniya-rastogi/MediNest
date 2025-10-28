// let http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);


//server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  // json to js obj as express can't understand json

// Routes
const healthcareRoute = require('./src/routes/healthcare');
app.use('/healthcare', healthcareRoute);

// const shoppingRoute = require('./src/routes/shopping');
// app.use('/shopping', shoppingRoute);

// const educationRoute = require('./src/routes/education');
// app.use('/education', educationRoute);


// Start server
app.listen(port, () => {
  console.log(`MediNest Backend running on port ${port}`);
})
