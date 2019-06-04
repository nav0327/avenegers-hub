import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

class Counter extends Component {
  state = {
    //value: this.props.value
    value: 0
  };

  //   constructor() {
  //     super();
  //     this.handleIncrement = this.handleIncrement.bind(this);
  //   }

  handleIncrement = () => {
    if (this.state.value < this.props.parentContext)
      this.setState({ value: this.state.value + 1 });
    this.state.value = this.state.value + 1;
    var apiBaseUrl = "http://localhost:4000/";
    var payload = {
      user_id: this.props.cLogin.state.userInfo["id"],
      product_name: this.props.pdetails.product_name,
      price: this.props.pdetails.price,
      product_id: this.props.pdetails.product_id,
      quantity: this.state.value
    };
    console.log(payload);
    axios.post(apiBaseUrl + "counter", payload).then(response => {
      if (response.data.code === 200) {
        alert("Product Successfully Deleted");
      }
    });
  };

  handleDecrement = () => {
    if (this.state.value > 0) this.setState({ value: this.state.value - 1 });
  };
  componentDidMount() {
    console.log(this.props.price);
  }
  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatValue()}</span>
        <span className={this.getBadgeClasses()}>
          {parseInt(this.state.value) * parseInt(this.props.price)}
        </span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>
        <button
          onClick={this.handleDecrement}
          className="btn btn-danger btn-sm m-2"
        >
          -
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatValue() {
    const { value } = this.state;
    return value === 0 ? "Cart ( Zero ) " : "Cart ( " + value + " )";
  }
}

export default Counter;
