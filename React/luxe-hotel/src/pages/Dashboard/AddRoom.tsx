import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RoomForm from "./RoomForm";

function AddRoom() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Room
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Room Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddRoom;
