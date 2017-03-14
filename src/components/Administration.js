import React from 'react';
import {observer , inject} from 'mobx-react';
import {Jumbotron, Well} from 'react-bootstrap';

class Administration extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.createAdministrationComponenet = this.createAdministrationComponenet.bind(this);
  }

  createAdministrationComponenet(){
    if(this.props.userStore.isloggedin){
      return(
        <Well>
        <h1>Administration </h1>
        </Well>
      );
    }else{
      return(
        <Well>
        <h1>Administration</h1>
        </Well>
      );
    }
  }

  render() {
    let welcomeComponent = this.createAdministrationComponenet();

    return (
      <Jumbotron className="col-md-12">
        {welcomeComponent}
      </Jumbotron>
     );
  }
}

Administration.propTypes = {
  userStore: React.PropTypes.object
};

export default inject('imageStore', "userStore")(observer(Administration));
