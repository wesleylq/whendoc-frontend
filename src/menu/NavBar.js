import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink} from 'mdbreact';
import './NavBar.css'
import { Link, Switch, Route } from 'react-router-dom';
import logo from '../logo.jpg';
import Paciente from '../paciente/Paciente.js'
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
    this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    render() {
        return (
            <div>
                <Navbar id='navbar' dark expand="md" scrolling>
                    <NavbarBrand href="/menu">when,doc
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav left id="navbar">
                            <NavItem>
                                <NavLink to="#">Meu Perfil</NavLink>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/menu/paciente">Pacientes</Link>
                            </NavItem>
                        </NavbarNav>
                        <NavbarNav right id="navbar">
                            <NavItem>
                                <NavLink to="logaut">Sair</NavLink>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                <Switch>
                    <Route path = '/menu/paciente' component = {Paciente}/>
                </Switch>
            </div>
        );
    }
}

export default NavBar;