import React from 'react';
import {observer, inject} from 'mobx-react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';



class AddByUrl extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      url: "",
      description: ""
    };

    this.handleNewGif = this.handleNewGif.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleNewGif(e){
    this.props.imageStore.saveToLibrary(this.state, this.props.userStore._id);
  }

  handleNameChange(e){
    this.setState({
      name: e.target.value
    });
  }

  handleUrlChange(e){
    this.setState({
      url: e.target.value
    });
  }

  handleDescriptionChange(e){
    this.setState({
      description: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="col-md-3">
        </div>
        <div className="col-md-6 well">
          <form>
              <legend>Add New Gif Manually By Url</legend>
              <div className="form-group">
                <label>Name / Keyword</label>
                <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="keyword" placeholder="keyword"/>
              </div>
              <div className="form-group">
                <label>Url</label>
                <input onChange={this.handleUrlChange} value={this.state.url}type="text" className="form-control" id="url" placeholder="url"/>
              </div>

              <div className="form-group">
                <label>Description</label>
                <input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" id="description" placeholder="description"/>
              </div>
              <Link to="/library"><Button onClick={this.handleNewGif} type="submit" className="btn btn-primary">Submit</Button></Link>
            </form>
          </div>
          <div className="col-md-3">
          </div>
        </div>
     );
  }
}

AddByUrl.propTypes = {
  imageStore: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject("imageStore","userStore")(observer(AddByUrl));
