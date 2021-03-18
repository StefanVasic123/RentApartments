import React, { useState } from 'react';
import {
    Container,
    Form,
    Button
} from 'react-bootstrap';
import axios from 'axios';

const NewApartmant = () => {
    const [building, setBuilding] = useState(0);
    const [floor, setFloor] = useState(0);
    const [id, setId] = useState(0);
    const [m2, setM2] = useState(0);
    const [conf, setConf] = useState(0);
    const [price, setPrice] = useState(0);

    async function submitForm() {
        console.log(building, floor, id, m2, conf, price)
        await axios.post('/newApartment', {
            building: Number(building),
            floor: Number(floor),
            id: Number(id),
            m2: Number(m2),
            conf: Number(conf),
            price: Number(price),
            userId: localStorage.getItem('userId')
        })
        .then(res => console.log(res))
        .catch(err => console.log(err)) 
    }
    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Novi Apartman</h1>
                <Form.Group controlId="formBasicBuilding">
                    <Form.Label>Zgrada</Form.Label>
                    <Form.Control type="number" placeholder="Upisi broj zgrade" onChange={(e) => setBuilding(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicFloor">
                    <Form.Label>Sprat</Form.Label>
                    <Form.Control type="number" placeholder="Upisi broj sprata" onChange={(e) => setFloor(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicId">
                    <Form.Label>Broj</Form.Label>
                    <Form.Control type="number" placeholder="Upisi broj apartmana" onChange={(e) => setId(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicM2">
                    <Form.Label>Kvadratura</Form.Label>
                    <Form.Control type="number" placeholder="Upisi kvadraturu" onChange={(e) => setM2(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicRooms">
                    <Form.Label>Sobe</Form.Label>
                    <Form.Control type="number" placeholder="Upisi broj soba" onChange={(e) => setConf(e.target.value)} step=".01"/>
                </Form.Group>

                <Form.Group controlId="formBasicPrice">
                    <Form.Label>Cena</Form.Label>
                    <Form.Control type="number" placeholder="Upisi cenu na mesecnom nivou" onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>

                <Button variant="primary" onClick={submitForm}>
                    Zabelezi
                </Button>
        </Container>
    );
};

export default NewApartmant;