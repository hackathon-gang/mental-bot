require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./src/routes/routes');
const path = require('path');

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(express.static('public', { maxAge: '1d' }));

app.use(bodyParser.json());
app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

app.use(router);

app.use((err, req, res, next) => {
    console.error(err); // for debugging
    const status = err.status || 500;
    return res.status(status).send({
        statusCode: status,
        ok: false,
        message: err.message || 'Unknown server error',
        data: '',
    });
});

routes(app, router);
const port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});
