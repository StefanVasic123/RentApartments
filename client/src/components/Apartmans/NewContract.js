import React from 'react';
import {
    Modal,
    Dialog,
    Header,
    Title,
    Body
} from 'react-bootstrap';

const NewContract = () => {
    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
            <Modal.Title>Novi ugovor</Modal.Title>
            </Modal.Header>
        
            <Modal.Body>
                <div>
                Modal za novi ugovor <br />
                Upisuje se broj zgrade, sprat, apartman, ime itd... <br />
                Submit-ovanjem ovog modala dopunjuje se tabela sa ovim novim stanarom
                </div>
            </Modal.Body>
        
            <Modal.Footer>
            <Button variant="secondary">Zatvoriti</Button>
            <Button variant="primary">Dodaj</Button>
            </Modal.Footer>
      </Modal.Dialog>
        
    );
};

export default NewContract;