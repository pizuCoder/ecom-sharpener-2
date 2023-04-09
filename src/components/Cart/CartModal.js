import React, { useState, useContext, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { StoreContext } from "../../StoreContext";

// import axios from "axios";

// const crudLink = 'https://crudcrud.com/api/7d0208a938e944d9a4074883876d2059/cartItems'

export default function Cart() {
  const { clearItem } = useContext(StoreContext);
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(crudLink);
  //       setCartItems(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

// localStorage
  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const CartItems = cartItems.map((item) => (
    <div
      key={item.id}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <img src={item.imageUrl} alt="product" style={{ width: "20%" }} />
      <p>{item.title}</p>
      <p>Rs{item.price}</p>
      <p>{item.quantity}</p>
      <p>
        <Button onClick={() => clearItem(item.id)}>Clear Item</Button>
      </p>
    </div>
  ));
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cart <Badge bg="secondary">{totalItems}</Badge>
        <span className="visually-hidden">cart-items</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
