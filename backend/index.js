// const express = require("express");
// const cors = require('cors');
// const config = require('./src/config/config');

// let app = express();

// // Enable CORS for all routes using the cors middleware
// app.use(cors());

// // Server Settings
// const PORT = 5000;
// const bodyParser = require("body-parser");

// // Request Parsing
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Express Router
// const router = express.Router();

// // Import and use the chatRoute
// // const chatRoute = require("./src/router/chatRoute.js");
// // router.use("/chatRoute", chatRoute);

// app.use(router);

// // Listen for incoming requests
// app.listen(PORT, err => {
//     if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
//     console.log(`Server is Listening on: http://localhost:${PORT}/`);
// });
