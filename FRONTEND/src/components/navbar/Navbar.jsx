import { AiFillHome } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import { Button, Container, Nav, Navbar} from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa'
import './Navbar.css'
import "../../index.css";
function NavbarComponent() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container className="nav">
          <NavLink className="navbar-brand" to={"/HomePage"} > <AiFillHome/> Home</NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav-options">
              <NavLink className="nav-link" to={"/HomePage"} > Dashboard </NavLink>
              <NavLink className="nav-link" to={"/sends"} > Envios </NavLink>
              <NavLink className="nav-link" to={"/NewSend"} > Crear Envio </NavLink>
            </Nav>
          </Navbar.Collapse>
          <Button className='btn-login' variant="light" href="/homePage" > <FaUserCircle /> </Button>
        </Container>
    </Navbar>
    </>
  );
}

export default NavbarComponent;
