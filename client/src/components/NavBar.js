import React from "react";
import { Link } from "react-router-dom";
import PS3Logo from "../assets/logo.png";
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
  DropdownItem
} from "reactstrap";

class NavBar extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  users = [
    {
      name: "Will",
      email: "chiefxcruz@gmail.com",
      id: "VXNlcjo0"
    },
    {
      name: "Jake",
      email: "jake.waltrip@gmail.com",
      id: "VXNlcjoz"
    },
    {
      name: "Sean",
      email: "sean.philippi@gmail.com",
      id: "VXNlcjox"
    },
    {
      name: "Zeke",
      email: "zgutier4@gmail.com",
      id: "VXNlcjoy"
    }
  ];

  // creates an array of users for navbar dropdown menu
  options = this.users.map((user, idx) => {
    return (
      <DropdownItem key={idx}>
        <NavLink tag={Link} to={"/games/" + user.id}>
          {user.name}
        </NavLink>
      </DropdownItem>
    );
  });

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" className="mr-auto" style={{ width: "200px" }}>
            <img src={PS3Logo} alt="logo" style={{ width: "80%" }} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  User Collections
                </DropdownToggle>
                <DropdownMenu right>{this.options}</DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
