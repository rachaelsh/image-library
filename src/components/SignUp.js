import React from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Panel, Button } from 'react-bootstrap';

class SignUp extends React.Component {
  constructor(){
    super();

    this.state = {
      name: "",
      password: ""
    };

    this.handleUserSignUp = this.handleUserSignUp.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserSignUp(e){
    // e.preventDefault();
    this.props.userStore.saveNewUser(this.state);
    this.props.userStore.authenticateUser(this.state);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render(){
    return(
      <div className="container">
      <Panel header="Sign Up" bsStyle="primary">
      <form>

        <div className="form-group">
          <input onChange={this.handleNameChange} value={this.state.name}
          type="text" className="form-control" id="name" placeholder="name"/>
        </div>

        <div className="form-group">
          <input onChange={this.handlePasswordChange} value={this.state.password}
          type="password" className="form-control" id="password" placeholder="password"/>
        </div>

        <Link to="/"><Button onClick={this.handleUserSignUp} type="submit" className="btn btn-primary">Submit</Button></Link>

      </form>
      </Panel>
      </div>
    );
  }
}

SignUp.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(SignUp));
