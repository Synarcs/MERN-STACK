import React, { Component } from 'react'
import {Navbar,NavbarBrand,Container,NavItem,Nav,Collapse,NavbarToggler} from 'reactstrap';
import axios from 'axios';
import NavLink from 'reactstrap/lib/NavLink';
import {connect} from 'react-redux';
import Proptypes from 'prop-types';

import Register from './auth/register'
import Logout from './auth/Logout';
import Login from './auth/login';


class Navbar_menu extends Component {
    constructor(){
        super();
        this.state={
            isOpen:false,
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.setState({
            isOpen :!this.state.isOpen
        })        
    }
    static propTypes = {
       auth:Proptypes.object.isRequired
    }
    render() {
        const {token,isauth,isloading,isuser} = this.props.auth;
        const stat_Links = (<React.Fragment>
                  <NavItem>
                      <NavLink>
                        {isuser ? <span className="navbar-text">{isuser.username}</span> :null}
                    </NavLink>
                    <NavLink>                       
                        <Logout />
                    </NavLink>
                 </NavItem>
        </React.Fragment>)
        const guess_Links =(
            <React.Fragment>
                <NavItem>
                    <Login />
                </NavItem>
                <NavItem>
                    <Register />
                </NavItem>
            </React.Fragment>
        )
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-3">
                    <Container>
                        <NavbarBrand className="text-warning">Main</NavbarBrand>
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    {isauth ? stat_Links : guess_Links}  
                                </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
const mapStatetoProps = (state)=>({
    auth:state.auth
})

export default connect(mapStatetoProps)(Navbar_menu);