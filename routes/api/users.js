const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// GET route
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
})

// POST route => save user in DB and send respond message to login with credentials
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }
    User.findOne({ email }).then(user => {
        if(user) return res.status(400).json({ msg: 'User already exist' })
        const newUser = new User({ name, email, password });
        bcrypt.genSalt(10, (err ,salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            {expiresIn: 3000 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                            }
                        })
                    })
                })
            })
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
