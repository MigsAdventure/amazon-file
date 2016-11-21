import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitFile } from '../actions/ImageActions';

@connect(
  null,
  dispatch => {
    return {
      submitFile(file) {
        dispatch(submitFile(file));
      },
    };
  }
)
export default class AmazonPhoto extends Component {
  constructor() {
    super();
    this.state = {
      imageURL: '',
      file: '',
    };

    let chooseFile = this.chooseFile.bind(this);
    let submitPic = this.submitPic.bind(this);
  }


  submitPic (e) {
    e.preventDefault(e)
    const { submitFile } = this.props;
    let { file } = this.state;
    submitFile(file);
  }

  chooseFile (e){
    const reader = new FileReader();
    console.log('e.target.files[0]:', e.target.files[0]);
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageURL: reader.result,
        file: file,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    console.log('this.state.imageURL:', this.state.imageURL);
    console.log('this.state.file:', this.state.file);
    return (
      <form onSubmit={this.submitPic}>
        <input type="file" onChange={this.chooseFile} />
        <button className="btn btn-default" >Upload</button>
      </form>
    );
  }
}
