import Nav from "react-bootstrap/Nav";
// import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Cart from "./Cart/CartModal";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate()
  const authCtx = useContext(StoreContext);
  const { logout } = authCtx.contextValue;
  const { isLoggedIn } = authCtx.contextValue;
  // console.log(isLoggedIn)
  const logoutHandler = () => {
    logout();
    navigate('/login')
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {isLoggedIn && (
            <Nav
              className="justify-content-center"
              style={{ marginLeft: "22rem" }}
            >
              <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/store">Store</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/contact">Contact Us</Nav.Link>
              </Nav.Item>
            </Nav>
          )}
          {isLoggedIn && <Cart />}
          {!isLoggedIn && (
            <a href="/login">
              <Button>Login</Button>
            </a>
          )}

          {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
        </Container>
      </Navbar>
    </>
  );
};
// render(<Cart />)
export default NavBar;
