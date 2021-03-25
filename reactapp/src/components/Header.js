import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  if (props.token === "") {
    return (
      <Navbar
        fluid
        light
        expand="md"
        sticky="top"
        style={{ backgroundColor: "#4280AB" }}
      >
        <NavbarBrand href="/" className="navbarStach logo">
          'Stach
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/">Nouvelle Recherche</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/SignScreen">S'inscrire / Se connecter</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/rafael-szmarowski">
                Contactez-nous
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar
        fluid
        light
        expand="md"
        sticky="top"
        style={{ backgroundColor: "#4280AB" }}
      >
        <NavbarBrand className="navbarStach logo">
          <Link className="navbarStach logo" to="/">
            'Stach
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/">Nouvelle Recherche</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  props.onRemoveToken();
                  props.onResetAppointment();
                }}
              >
                <Link to="/">Se deconnecter</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/ProfileScreen">Mes Rendez-vous</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/FavoriteScreen">Mes favoris</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/rafael-szmarowski">
                Contactez-nous
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveToken: () => {
      dispatch({ type: "REMOVE_TOKEN" });
    },
    onResetAppointment: () => {
      dispatch({ type: "resetAppointment" });
    },
  };
};

const mapStateToProps = (state) => {
  return { token: state.token };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
