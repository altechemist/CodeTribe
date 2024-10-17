import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

function CustomNavbar() {
  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        sticky="top"
        className="bg-light d-flex align-items-center p-1 shadow"
      >
        <Link className="navbar-brand" to="/">
          <img
            className="img"
            style={{ maxWidth: "100px", height: "auto" }}
            src={logo}
            alt="logo"
          />
        </Link>

        <Container fluid className="d-flex flex-column justify-content-end">
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav" className="ms-auto">
            <Nav className="me-auto justify-content-end border-1">
              <Nav.Link as={Link} to="/" active aria-current="page">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/gallery">
                Gallery
              </Nav.Link>
              <Nav.Link as={Link} to="/rooms">
                Rooms
              </Nav.Link>
              <Nav.Link as={Link} to="/events">
                Events
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                title={
                  <img
                    src="https://github.com/mdo.png"
                    alt="Profile"
                    width="32"
                    height="32"
                    className="rounded-circle"
                    aria-label="User profile"
                  />
                }
                id="profile-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile/#reservations">
                  My Bookings...
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile/#favorites">
                  Favorites
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile/#account">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="#">
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          {/* Separate Row for Map and Phone */}
          <Container fluid className="bg-light d-flex justify-content-end align-items-center p-1">
            <Nav>
              <Nav.Link
                as={Link}
                to="https://www.google.com/maps?ll=-28.738809,24.754799&z=15&t=m&hl=en&gl=ZA&mapclient=embed&cid=957914449917949251"
              >
                <i className="bi bi-geo-alt" aria-label="View Map"></i> View Map
              </Nav.Link>
              <Nav.Link href="tel:+27538028200">
                <i className="bi bi-telephone" aria-label="Phone Number"></i> +27 53-802-8200
              </Nav.Link>
            </Nav>
          </Container>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
