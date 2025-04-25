const express =  require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

//middleware to redirect user if already logged in
 function redirectIfLoggedIn(req, res, next) {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    next();
    }
}

//GET: register page
router.get('/register', redirectIfLoggedIn, (req, res) => {
    res.render('register', {errors: [], oldInput: {}});
});

//POST: register user
router.post(
    '/register',
    redirectIfLoggedIn,
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')

    ],
    async (req, res) => {
        const errors = validationResult(req);
        const { name, email, password } = req.body;

        if (!errors.isEmpty()) {
            return res.render('register', {
                errors: errors.array(),
                oldInput: { name, email}
            });
        }

        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.render('register', {
                errors: [{ msg: 'Email already exists' }],
                oldInput: { name, email }
            });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        req.session.userId = newUser._id;
        res.redirect('/dashboard');

    }
);

//GET: login page
router.get('/login', redirectIfLoggedIn, (req, res) => {
    res.render('login', { errors: [], oldInput: {}});
})

//POST: login user
router.post(
    '/login',
    redirectIfLoggedIn,
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
    ],

    async (req, res) => {
        const errors = validationResult(req);
        const { email, password } = req.body;

        if (!errors.isEmpty()) {
            return res.render('login', {
                errors: errors.array(),
                oldInput: { email }
            });
        }

        const user = await User.findOne({ email });
        if(!user || !(await user.matchPassword(password))) {
            return res.render('login', {
                errors: [{ msg: 'Invalid email or password' }],
                oldInput: { email }
            });
        }

        req.session.userId = user._id;
        res.redirect('/dashboard');
    }
);

//GET: logout user
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/login');
    });
});

//GET: dashboard page (protected route)
router.get('/dashboard', async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    
    const user = await User.findById(req.session.userId);
    res.render('dashboard',{ user });
});

module.exports = router;



