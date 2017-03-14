import React from 'react';
import {observer , inject} from 'mobx-react';
import ImageComponent from './ImageComponent';

class Library extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.prepareImages = this.prepareImages.bind(this);
  }

  prepareImages() {
    return this.props.imageStore.library.map(function(img) {
      return(<ImageComponent
              key={img._id}
              imageinfo={img}
              typeofdisplay="library"/>);
    }, this);
  }
  render() {

    return (
      <div className="col-md-12">
        {this.prepareImages()}
      </div>
    );
  }
}

Library.propTypes = {
  imageStore: React.PropTypes.object
};

export default inject('imageStore')(observer(Library));
