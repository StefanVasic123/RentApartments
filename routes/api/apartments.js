const express = require('express');
const router = express.Router();

const Apartment = require('../../models/Apartment');

// POST new apartment
router.post('/', (req, res) => {
    const { building, floor, id, m2, conf, price, status } = req.body;
    const newApartment = new Apartment({
        building,
        floor,
        id,
        m2,
        conf,
        price,
        status
    })
    newApartment.save().then(apartment => res.json(apartment))
})

// GET all apartments 
router.get('/', (req, res) => {
    Apartment.find()
        .sort({ date: -1 })
        .then(apartments => res.json(apartments))
})

// Change apartment -> treba da se sstavi zgrada, apartman, userId, prvu zagradu a u drugu da se navede ceo apartman
router.post('/update', (req, res) => {
    Apartment.findOneAndUpdate({ name: req.body.name }, {
        $set: {
            name: req.body.name
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.send(result)
    })
})

module.exports = router;