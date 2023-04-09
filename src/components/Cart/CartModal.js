import React, { useState , useContext} from 'react';
import Badge from "react-bootstrap/Badge";
// import Button from "react-bootstrap/Button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { StoreContext } from '../../StoreContext';



export default function Cart() {
    const { storeItems, clearItem } = useContext(StoreContext);
  const [show, setShow] = useState(false);
  

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const CartItems = storeItems.map((item) => (
    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <img src={item.imageUrl} alt="product" style={{width:"20%"}}/>
      <p>{item.title}</p>
      <p>Rs{item.price}</p>
      <p>{item.quantity}</p>
      <p><Button onClick={() => clearItem(item.id)}>Clear Item</Button></p>
    </div>
  ));
  const totalItems = storeItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
          Cart <Badge bg="secondary">{totalItems}</Badge>
          <span className="visually-hidden">cart-items</span>
        </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign: "center"}}>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body><div style={{display: "flex",
            justifyContent:"space-between",}}>
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          </div>
          {CartItems}
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<Cart />);