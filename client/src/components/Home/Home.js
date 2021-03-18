import React from 'react';
import { Container, Row } from 'react-bootstrap';

import NavBar from '../NavBar/NavBar';
import TableInfo from '../Table/TableInfo';

const Home = () => {
    return (
        <Container>
            <Row style={{ display: "flex", flexDirection: "column" }}> 
                <NavBar />
                <TableInfo />
            </Row>
        </Container>
    );
};

export default Home;