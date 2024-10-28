import { NavLink } from "react-router-dom";
import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import styles from "./style.module.css";
import HeaderLeftBar from "./LeftHeader/LeftHeader";


const Header = () => {
    
    return (
        <header>
            <div className={styles.headerContainer}>
                <h1 className={styles.headerLogo}>
                    <span>Our</span> <Badge bg="info">eCom</Badge>
                </h1>
                <div className="d-flex flex-row">
                <HeaderLeftBar />
                </div>
            </div>
            <Navbar
                expand="lg"
                className="bg-body-tertiary"
                bg="dark"
                data-bs-theme="dark"
            >
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="categories">
                                Categories
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="about-us">
                                About
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={NavLink} to="login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="register">
                                Register
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;