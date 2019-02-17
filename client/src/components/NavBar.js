import React from 'react';
import logo from '../logo.png';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  style = {
    width: '15%',
  }

  users = [
    {
      name: 'Sean',
      email: 'sean.philippi@gmail.com',
      id: 'VXNlcjox'
    },
    {
      name: 'Zeke',
      email: 'zgutier4@gmail.com',
      id: 'VXNlcjoy'
    },
    {
      name: 'Jake',
      email: 'jake.waltrip@gmail.com',
      id: 'VXNlcjoz'
    },
    {
      name: 'Will',
      email: 'chiefxcruz@gmail.com',
      id: 'VXNlcjo0'
    }
  ];

  options = this.users.map(user => {
    return (
      <DropdownItem>
        <NavLink tag={Link} to={'/games/' + user.id}>{user.name}</NavLink>
      </DropdownItem>            
    )
  })

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" className="mx-auto"><img style={this.style} src={logo} alt="logo"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {/* <NavLink href="/components/">Components</NavLink> */}
              </NavItem>
              <NavItem>
                {/* <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink> */}
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Users
                </DropdownToggle>
                <DropdownMenu right>
                  {this.options}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}