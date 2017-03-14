import React from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Panel, Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor(){
    super();

    this.state = {
      name: "",
      password: ""
    };

    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserLogin(e){
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
      <Panel header="Log In" bsStyle="primary">
      <form>

        <div className="form-group">
          <input onChange={this.handleNameChange} value={this.state.name}
          type="text" className="form-control" id="name" placeholder="name"/>
        </div>

        <div className="form-group">
          <input onChange={this.handlePasswordChange} value={this.state.password}
          type="password" className="form-control" id="password" placeholder="password"/>
        </div>

        <Link to="/"><Button onClick={this.handleUserLogin} type="submit" className="btn btn-primary">Submit</Button></Link>

      </form>
      </Panel>
      </div>
    );
  }
}

Login.propTypes = {
  userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Login));
