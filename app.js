const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');

const mealsRoutes = require('./routes/meals-routes');
const usersRoutes = require('./routes/users-routes');
const ordersRoutes = require('./routes/orders-routes');


const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/meals', mealsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    next(error);
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message } || 'An unknown error occurred!');
});

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oiaxvo8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(process.env.port || port, () => { console.log(`Listening on port ${process.env.port}`) });
    })
    .catch(err => { console.log(`Logging error: ${err}`) });