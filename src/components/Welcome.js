import React from 'react';
import {observer , inject} from 'mobx-react';
import {Jumbotron, Well} from 'react-bootstrap';

class Welcome extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.createWelcomeComponenet = this.createWelcomeComponenet.bind(this);
  }

  createWelcomeComponenet(){
    if(this.props.userStore.isloggedin){
      return(
      <Well>
      <h1>Welcome {this.props.userStore.username}</h1>
      <h2> You sucessfully logged in and can now post new images </h2>
      </Well>
    );
    }else{
      return(
      <Well>
      <h1>Welcome</h1>
      <h2> You are not currently logged in.
        Feel free to browse and search the library anonymously but you will need to
        login or create an account to post images</h2>
      </Well>
    );
    }
  }

  render() {
    let welcomeComponent = this.createWelcomeComponenet();

    return (
      <Jumbotron className="col-md-12">
      {welcomeComponent}
      </Jumbotron>
    );
  }
}

Welcome.propTypes = {
  userStore: React.PropTypes.object
};

export default inject('imageStore', "userStore")(observer(Welcome));
