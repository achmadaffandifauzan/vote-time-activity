if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoSanitize = require('express-mongo-sanitize');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const User = require('./models/user');

const dbUrl = process.env.DB_URL;
mongoose.set('strictQuery', true);
mongoose.connect(dbUrl);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log("Database Connected ~mongoose");
})
const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.join(__dirname, "frontend/public")));
} else {
    app.use(express.static(path.join(__dirname, 'build')));
}
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
mongoSanitize.sanitize({
    allowDots: true,
    replaceWith: '_'
});

const secret = process.env.SECRET;
const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60 // time period in seconds
})
store.on('error', function (e) {
    console.log("SESSION STORE ERROR : ", e)
})
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
        maxAge: 1000 * 60 * 60 * 24
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// app.use('/', userRoutes);


app.all('*', (req, res, next) => {
    next(new ExpressError('Not Found!', 404));
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong!'
    res.status(statusCode).render('error', { err });
})
const PORT = process.env.PORT || 3100;



//Connect to the database before listening
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ~express`);
})
