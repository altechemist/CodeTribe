import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

function CustomNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      className="bg-white d-flex align-items-center p-1 shadow nav-bar"
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
          <Nav className="me-auto justify-content-end">
            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/gallery"
              active={location.pathname === "/gallery"}
            >
              Gallery
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/rooms"
              active={location.pathname === "/rooms"}
            >
              Rooms
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/events"
              active={location.pathname === "/events"}
            >
              Events
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              active={location.pathname === "/about"}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              active={location.pathname === "/contact"}
            >
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
              <NavDropdown.Item as={Link} to="/profile">
                My Bookings...
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">
                Favorites
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        {/* Separate Row for Map and Phone */}
        <Container
          fluid
          className="bg-white d-flex justify-content-end align-items-center p-1 "
        >
          <Nav className="nav-bar-row-2">
            <Nav.Link
              as="a"
              href="https://www.google.com/maps?ll=-28.738809,24.754799&z=15&t=m&hl=en&gl=ZA&mapclient=embed&cid=957914449917949251"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-geo-alt" aria-label="View Map"></i> View Map
            </Nav.Link>

            <Nav.Link href="tel:+27538028200">
              <i className="bi bi-telephone" aria-label="Phone Number"></i> +27
              53-802-8200
            </Nav.Link>
          </Nav>
        </Container>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
