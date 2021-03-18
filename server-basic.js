const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');

const config = require('config');

const db = config.get('mongoURI');

app.use(express());

app.use(cors({ 
    'Access-Control-Allow-Origin': 'http://localhost:3000'
}))

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

// NE TREBA DA PITA ZA AUTORIZACIONI TOKEN KADA SE LOGINUJE
app.use('/api/users', require('./routes/api/users'));
app.use('/api/apartments', require('./routes/api/apartments')); 
app.use('/api/auth', require('./routes/api/auth'));

app.listen(port, () => console.log(`Server started at port ${port}`))
