const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const config = require('config');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt = require('express-jwt');
const csrf = require('csurf');

const User = require('./models/User');
const Apartment = require('./models/Apartment');

const jwtSecret = config.get("jwtSecret");

const db = config.get("mongoURI");

app.use(express.json());

app.use(cors({
    'Acces-Control-Allow-Origin': 'http://localhost:3000'
})); 

 app.use(cookieParser());

// ovo ce da postavi jwt credentials da je getToken() zapravo cookie iz client poziva
// nema token iz requesta to mora iz useEffect-a
// al sam glup! getToken trazi req.cookies.token!, znaci nekako moram da setujem cookie-token prvo
app.use(
    jwt({
        secret: jwtSecret,
        getToken: req => req.cookies.token,
        algorithms: ['HS256']
    })
    .unless({ path: ['/loginUser', '/newUser']})
) 

const confProtection = csrf({
    cookie: true
})

app.use(confProtection);

// This is called on useEffect to validate cookie token 
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
})

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// POST route => save user in DB and send respond message to login with credentials
app.get('/newUser', (req, res) => {
    const { name, email, password } = req.query;
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
                        jsonwebtoken.sign(
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

// POST route => LOGIN USER => crypto password
app.get('/loginUser', (req, res) => {
    const { email, password } = req.query;
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }
    User.findOne({ email }).then(user => {
        if(!user) return res.status(400).json({ msg: 'User doesnt exist' })
        const newUser = new User({ email, password });
        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
            const cookieToken = jsonwebtoken.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 90000 });
            res.cookie('token', cookieToken, { httpOnly: true });
            res.json({ cookieToken, user: { id: user.id, name: user.name, email: user.email }});
        })
    })
})

// get apartments 
app.get('/getApartments', (req, res) => {
    const { userId } = req.query;
    Apartment.find({ userId: userId })
                .then(apartments => res.json(apartments))
                .catch(err => res.json(err))
})

// POST new apartment
app.post('/newApartment', (req, res) => {
    const { building, floor, id, m2, conf, price, userId } = req.body;
    const newApartment = new Apartment({
        building,
        floor,
        id,
        m2,
        conf,
        price,
        userId
    })
    newApartment.save().then(apartment => res.json(apartment))
})

// NE TREBA DA PITA ZA AUTORIZACIONI TOKEN KADA SE LOGINUJE
app.use('/api/users', require('./routes/api/users'));
app.use('/api/apartments', require('./routes/api/apartments')); 
app.use('/api/auth', require('./routes/api/auth'));

app.listen(port, () => console.log(`Server started at port ${port}`))


