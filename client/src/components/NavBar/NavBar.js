import React, { useState } from 'react';
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Modal
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Apartmani</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link onClick={handleShow}>Novi ugovor</Nav.Link>
                    <Nav.Link href="#link">Info</Nav.Link>
                    <NavDropdown title="Filter" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Garsonjere</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Jednosobni</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Jednoiposobni</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Dvosobni</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Dvoiposobni</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Trosobni</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Lux</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Lokali</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">0e-100e</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">100e-200e</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">200e-300e</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">300e-400e</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">400+e</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">0m<sup>2</sup> - 100m<sup>2</sup></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">100m<sup>2</sup> - 200m<sup>2</sup></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">200m<sup>2</sup> - 300m<sup>2</sup></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">300m<sup>2</sup> - 400m<sup>2</sup></NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">400+m<sup>2</sup></NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Pretrazi</Button>
                    </Form> */} 
                    <Form>
                        <NavDropdown.Item ><Link to='/admin'>Admin</Link></NavDropdown.Item> {/* linkuje ka formi za dodavanje novog apartmana*/}
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Novi Ugovor</Modal.Title>
                </Modal.Header>
                <Modal.Body>Modal za novi ugovor <br />
                        Upisuje se broj zgrade, sprat, apartman, ime itd... <br />
                        Submit-ovanjem ovog modala dopunjuje se tabela sa ovim novim stanarom<br />
                        primer: 
                        <input type="text" placeholder="upisi ime" /> <br />
                        <input type="text" placeholder="broj zgrade" /> itd
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Zatvoriti
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Procesuiraj
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NavBar;