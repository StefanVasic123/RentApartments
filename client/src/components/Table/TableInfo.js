import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './TableInfo.css';


// if its free field than take info from that field for building and else...
// if its taken > produzi, obrisi
const TableInfo = () => {
    const [apartments, setApartments] = useState([]);
    const [showChange, setShowChange] = useState(false);
    const [showFree, setShowFree] = useState(false);
    const [choosenId, setChoosenId] = useState(null);
    const [choosenM2, setChoosenM2] = useState(null);
    const [choosenConf, setChoosenConf] = useState(null);
    const [choosenPrice, setChoosenPrice] = useState(null);
    const [choosenStatus, setChoosenStatus] = useState('');
    const [buttons, setButtons] = useState(true);
    const [extended, setExtended] = useState(false);
    const [proceedFooter, setProceedFooter] = useState(true);

    // U DB-u imam informacije o zgradama i apartmanima 
    // apartments: id, building, floor, m2, conf, price , status, userId, 
    // i onda da odatle vuce ali nema veze neka bude za sada ovako

 /*   const [apartments, setApartments] = useState([
        { building: 1, floor: 7, id: 1, m2: 120, conf: 2, price: 200, startRent: Date.now(), endRent: Number(Date.now()) + 2629800000 },
        { building: 1, floor: 7, id: 2, m2: 200, conf: 3.5, price: 380 },
        { building: 1, floor: 7, id: 3, m2: 150, conf: 2.5, price: 250 },
        { building: 1, floor: 7, id: 4, m2: 400, conf: 5, price: 490 },

        { building: 1, floor: 8, id: 1, m2: 400, conf: 5, price: 490 },
        { building: 1, floor: 8, id: 2, m2: 400, conf: 5, price: 490, startRent: Date.now(), endRent: Number(Date.now()) + 2629800000 },
        { building: 1, floor: 8, id: 3, m2: 400, conf: 5, price: 490 },
        { building: 1, floor: 8, id: 4, m2: 400, conf: 5, price: 490 },
        { building: 1, floor: 8, id: 5, m2: 400, conf: 5, price: 490 },

        { building: 2, floor: 3, id: 1, m2: 400, conf: 5, price: 490 },
        { building: 2, floor: 3, id: 2, m2: 400, conf: 5, price: 490 },
        { building: 2, floor: 3, id: 3, m2: 400, conf: 5, price: 490, startRent: Date.now(), endRent: Number(Date.now()) + 2629800000 },
        { building: 2, floor: 3, id: 4, m2: 400, conf: 5, price: 490 },

        { building: 2, floor: 4, id: 1, m2: 400, conf: 5, price: 490 },
        { building: 2, floor: 4, id: 2, m2: 400, conf: 5, price: 490 },
        { building: 2, floor: 4, id: 3, m2: 400, conf: 5, price: 490, startRent: Date.now(), endRent: Number(Date.now()) + 2629800000 },

    ])
    */
    // setState of apartment in database
    useEffect(async () => {
        await axios.get('/getApartments', {
            params: {
                userId: localStorage.getItem('userId')
            }
        })
        .then(res => { 
            setApartments(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    function focus(e) {
        e.target.parentElement.cells[4].innerHTML === "free" ? setShowFree(true) : setShowChange(true)
        setChoosenId(e.target.parentElement.cells[0].innerHTML);
        setChoosenM2(e.target.parentElement.cells[1].innerHTML);
        setChoosenConf(e.target.parentElement.cells[2].innerHTML);
        setChoosenPrice(e.target.parentElement.cells[3].innerHTML);
        setChoosenStatus(e.target.parentElement.cells[4].innerHTML);
        console.log(e.target.parentElement.cells[0].innerHTML,e.target.parentElement.cells[1].innerHTML,
            e.target.parentElement.cells[2].innerHTML,e.target.parentElement.cells[3].innerHTML,
            e.target.parentElement.cells[4].innerHTML)
    }
    

    const handleCloseChange = () => {
        setShowChange(false);
        setProceedFooter(true);
    }
    const handleCloseFree = () => setShowFree(false);

    function expDate(end) {
        let x = new Date(end);
        let day = x.getDate();
        let year = x.getFullYear();
        let days = ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"];
        let months = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

        return  `${day} - ${months[x.getMonth()]} - ${year} (${days[x.getDay()]})`;
    }

    function extendField() {
        setButtons(false);
        setExtended(true);
        setProceedFooter(false);
    }

    function deleteField() {
        handleCloseChange();
        setButtons(true);
        setExtended(false);
        // stavi da ovaj field bude free
        // axios.post => findOneAndUpdate: 
        // default new apartmant
    }

    function onSubmitChange() {
        handleCloseChange();
    }

    function tableMain() {
        const buildings = apartments.map(item => item.building);
        const buildingsId = new Set(buildings);
        const buildingsArr = Array.from(buildingsId);

        return buildingsArr.map((item, index) => (
            <li key={index} style={{ textDecoration: "none", listStyleType: "none" }}>
                <div className={`building-row budilding-row-${item}`}>
                    <h2 className={`budilding-heading building-heading-${item}`}>Zgrada {item}</h2>
                    {apartments.filter((data, index) => data.building === item && apartments.findIndex(item => item.floor === data.floor) === index)
                                .map((apartment, i) => (
                                    <div>
                                        <li key={i}>Sprat {apartment.floor}</li>
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>BR</th>
                                                        <th>M2</th>
                                                        <th>conf</th>
                                                        <th>price</th>
                                                        <th>STATUS</th>
                                                    </tr>
                                                </thead>
                                                {apartments.filter(item => item.floor === apartment.floor).map((data, indx) => (
                                                <tbody>
                                                    <tr key={index} onClick={(e) => focus(e)} style={{ cursor: "pointer" }}>
                                                        <td>{data.id}</td>
                                                        <td>{data.m2}</td>
                                                        <td>{data.conf}</td>
                                                        <td>{data.price}</td>
                                                        <td style={ data.startRent ? { backgroundColor: 'red' } : { backgroundColor: 'green' }}>{data.startRent ? expDate(data.endRent) : 'FREE'}</td>
                                                    </tr>
                                                </tbody>
                                                ))}
                                            </Table>
                                    </div>
                    ))}
                </div>
            </li>
        ))
    }

    return (
        <Container>

            {tableMain()}
            
            <Modal show={showChange} onHide={handleCloseChange}>
                <Modal.Header closeButton>
                <Modal.Title>Izmeni ugovor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {buttons && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <Button variant="success" onClick={extendField}>Produzi</Button>
                            </div>
                            <div>
                                <Button variant="danger" onClick={deleteField}>Izbrisi</Button> 
                            </div>
                        </div>
                        )}
                        {extended && (
                            <div>
                               <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Broj meseci na koji se produzava ugovor</Form.Label>
                                        <Form.Control type="number" placeholder="Upisi broj meseci..." />
                                        <Form.Text className="text-muted">
                                        Nakon procesuiranja korisniku ovog apartmana ce biti produzen ugovor za unet broj meseci.
                                        </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onSubmit={onSubmitChange}>
                                        Procesuiraj
                                    </Button>
                                </Form>
                            </div>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseChange}>
                    Zatvoriti
                </Button>
                {proceedFooter && (
                    <Button variant="primary" onClick={handleCloseChange}>
                    Procesuiraj
                    </Button>
                )}
                </Modal.Footer>
            </Modal>

            <Modal show={showFree} onHide={handleCloseFree}>
                <Modal.Header closeButton>
                <Modal.Title>Napravi ugovor</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apartman br {choosenId} ({choosenM2}) price: ({choosenPrice})<br /> 
                        <input type="text" placeholder="upisi ime" /> <br />
                        <input type="text" placeholder="broj zgrade" /> itd
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseFree}>
                    Zatvoriti
                </Button>
                <Button variant="primary" onClick={handleCloseFree}>
                    Procesuiraj
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TableInfo;