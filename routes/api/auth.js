const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// GET route
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
})

// GET route => protected
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

// POST route
/* router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name
    })
    newUser.save().then(user => res.json(user))
}) */

// POST route => LOGIN USER => crypto password
router.post('/loginUser', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }
    User.findOne({ email }).then(user => {
        if(!user) return res.status(400).json({ msg: 'User doesnt exist' })
        const newUser = new User({ email, password });
        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
            const cookieToken = jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 90000 });
            res.cookie('token', cookieToken, { httpOnly: true });
            res.json({ cookieToken, user: { id: user.id, name: user.name, email: user.email }});
        /*    jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            ) */
        })
    })
})

// DELETE route
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;
