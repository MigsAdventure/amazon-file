import React, { Component } from 'react';
import { connect } from  'react-redux';
import AmazonPhoto from './AmazonPhoto';


export default class Layout extends Component {
  render() {

    return (
      <div className='container'>
        <AmazonPhoto />
      </div>
    )
  }
}
