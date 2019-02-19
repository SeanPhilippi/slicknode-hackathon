import React from 'react';
import PS3Logo from '../logo.png';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';

export default class NavBar extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

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

  // creates an array of users for navbar dropdown menu
  options = this.users.map((user, idx) => {
    return (
      <DropdownItem key={idx}>
        <NavLink tag={Link} to={'/games/' + user.id}>{user.name}</NavLink>
      </DropdownItem>            
    )
  });

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" style={{ height: '100px' }}>
          <NavbarBrand href="/" className="mx-auto" style={{ width: '200px' }}>
            <img src={PS3Logo} alt="logo" style={{ width: '80%' }}/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  User Collections
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