import React, {useState} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import LangSwitch from "../features/language/LangSwitch";

export default function TopMenu(props) {
    const [user, setUser] = useState(props.getStorage('authUser'));

    function login() {
        console.log(props.login())
        setUser(props.login());
    }

    function logout() {
        setUser(null);
    }

    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">{props.t('Home')}</Nav.Link>
                    <Nav.Link as={Link} to="/test">Test</Nav.Link>
                </Nav>
                <Nav>
                    {user && <Nav.Link as={Link} to="/cabinet">
                        {user.name}
                    </Nav.Link>}

                    {user && <Nav.Link onClick={logout}>
                        Logout
                    </Nav.Link>}
                    {!user && <Nav.Link onClick={login}>
                        Login
                    </Nav.Link>}
                    <LangSwitch {...props}/>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

}

