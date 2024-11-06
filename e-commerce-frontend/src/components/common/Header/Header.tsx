import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import styles from "./style.module.css";
import HeaderLeftBar from "./LeftHeader/LeftHeader";
// import actGetWishlist from "@store/wishlist/actGetWishlist";
import { authLogout } from "@store/Auth/authslice";


const Header = () => {
    const dispatch = useAppDispatch();
    const { accessToken, user } = useAppSelector((state) => state.auth);

    // useEffect(() => {
    //     if (accessToken) {
    //         dispatch(actGetWishlist("wishlistIds"));
    //     }
    // }, [dispatch, accessToken]);

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
                            {!accessToken ? (
                                <>
                                    <Nav.Link as={NavLink} to="login">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="register">
                                        Register
                                    </Nav.Link>
                                </>
                            ) : (
                                <NavDropdown
                                    title={`Welcome: ${user?.firstName} ${user?.lastName}`}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item as={NavLink} to="profile">
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/"
                                        onClick={() => dispatch(authLogout())}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;