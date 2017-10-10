import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/counterActions';
import './Counter.css';

class Counter extends Component {
  render() {
    const { increment, decrement } = this.props.actions;
    return (
      <div className="counter">
        <span className="counter__count">{this.props.count}</span><br/>
        <a href="#" onClick={() => increment(1)} className="counter__button">+</a>
        <a href="#" onClick={() => decrement(1)} className="counter__button">-</a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.counter.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);