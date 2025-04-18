require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const { cookie } = require('express-validator');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//view engine
app.set('view engine', 'ejs');

//sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'sessions',
            }),
    

        cookie: {maxAge: 1000 *60 *60 *2} // 2 hours
    })
);

//connect to mongodb
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Mongodb error: ', err));

//routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});
