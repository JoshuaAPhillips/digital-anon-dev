import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useMeta } from "./MetaContext";


export function CustomNavbar({ helperFunctions = {} }) {
    const meta = useMeta();

    return (
        <Navbar bg="light" expand="lg" className="sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    {meta.logo && (
                        <img
                            src={`${process.env.PUBLIC_URL}/${meta.logo}`}
                            alt="logo"
                            style={{ height: 64, width: 102, marginRight: "10px" }}
                        />
                    )}
                    {meta.title || "Necturus XML Viewer"}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {helperFunctions.resetLayout && (
                            <NavDropdown title="Set Layouts" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => helperFunctions.resetLayout("sbs")}>
                                    Half-Width
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => helperFunctions.resetLayout("fw")}>
                                    Full-Width
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                        <NavDropdown title="About">
                            <NavDropdown.Item as={Link} to="/about/citations">
                                Citations
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about/credits">
                                Credits
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about/documents">
                                Documents
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about/project">
                                Project
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/help">Help</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}