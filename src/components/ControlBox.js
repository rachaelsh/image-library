import React from 'react';
import { Link } from 'react-router';
import {observer, inject} from 'mobx-react';
import { Button , ButtonToolbar, MenuItem, DropdownButton, ButtonGroup, Navbar, NavDropdown, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';

class ControlBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.props.imageStore.fetchLibrary();

    this.createUserLinks = this.createUserLinks.bind(this);
    this.createGifLinks = this.createGifLinks.bind(this);
    this.logOutHandler = this.logOutHandler.bind(this);
  }

  logOutHandler(){
    this.props.userStore.logUserOut();
  }

  createGifLinks(){
    if(this.props.userStore.isloggedin){
      return(
        <NavDropdown title="Add A Gif" id="basic-nav-dropdown">
        <LinkContainer to={{pathname: '/addbyurl'}}><MenuItem>Add By URL</MenuItem></LinkContainer>
        <LinkContainer to={{pathname: '/searchgiphy'}}><MenuItem>Search Giphy</MenuItem></LinkContainer>
        </NavDropdown>
      );}else{
      return(
          <LinkContainer to={{pathname: '/searchgiphy'}}><NavItem>Search Giphy</NavItem></LinkContainer>
      );
    }
  }

  createUserLinks(){
    if(this.props.userStore.isloggedin && this.props.userStore.isadmin){
      return (
        <Nav pullRight>
        <Navbar .Text>Welcome {this.props.userStore.username}</Navbar .Text>
        <LinkContainer to={{pathname: '/administration'}}><NavItem>Administration</NavItem></LinkContainer>
        <LinkContainer to={{pathname: '/logout'}}><NavItem onClick={() => { this.logOutHandler(); }}>Log Out</NavItem></LinkContainer>
        </Nav>);
    }else if(this.props.userStore.isloggedin){
      return (
        <Nav pullRight>
        <Navbar .Text>Welcome {this.props.userStore.username}</Navbar .Text>
        <LinkContainer to={{pathname: '/logout'}}><NavItem onClick={() => { this.logOutHandler(); }}>Log Out</NavItem></LinkContainer>
        </Nav>);
    }else{
      return (
        <Nav pullRight>
        <LinkContainer to={{pathname: '/login'}}><NavItem>Login</NavItem></LinkContainer>
        <LinkContainer to={{pathname: '/signup'}}><NavItem>Sign Up</NavItem></LinkContainer>
        </Nav>);
    }
  }

  render() {
    const userLinks = this.createUserLinks();
    const gifLinks = this.createGifLinks();
    return (
     <div className="container-fluid">
        <Navbar inverse>
          <Navbar .Header>
            <Navbar .Brand>
              <Link to={{pathname: '/'}}>Gif Collector</Link>
            </Navbar .Brand>
          <Navbar .Toggle/>
          </Navbar .Header>
          <Navbar .Collapse>
            <Nav>
              <LinkContainer to={{pathname: '/library'}}><NavItem>View Library</NavItem></LinkContainer>
              {gifLinks}
            </Nav>
            {userLinks}
          </Navbar .Collapse>
        </Navbar>
        {this.props.children}
     </div>
   );
  }
}

ControlBox.propTypes = {
  children: React.PropTypes.object,
  imageStore: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("imageStore","userStore")(observer(ControlBox));
