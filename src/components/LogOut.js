import React from 'react';
import {observer , inject} from 'mobx-react';

class LogOut extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {

    return (
      <div className="col-md-12 well">
        You are now logged out.
      </div>
    );
  }
}

LogOut.propTypes = {
};

export default inject('imageStore')(observer(LogOut));
