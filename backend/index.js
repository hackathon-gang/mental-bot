import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routes/routes.js';

let app = express();
app.use(cors());

// Server Settings
const PORT = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "success" });
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    return res.status(status).json({
        statusCode: status,
        ok: false,
        message: error.message || "Internal Server Error"
    });
})

// Listen for incoming requests
app.listen(PORT, err => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    console.log(`Server is Listening on: http://localhost:${PORT}/`);
});