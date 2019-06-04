import React, { Component } from "react";
import { Button, Collapse, Row, Col } from "react-bootstrap";
import { Image } from "cloudinary-react";
import axios from "axios";
import "./ProductDetails.css";
import "bootstrap/dist/css/bootstrap.css";
import Counter from "./components/counter";
import CheckOutPage from "./CheckOutPage";
import { Route, NavLink, HashRouter, Link, BrowserRouter as Router } from "react-router-dom";
import firebase from "firebase";
import config from "./firebase-config";
import Homepage from "./homepage";
import { object } from "prop-types";

//firebase.initializeApp(config);

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    // Obj = new Homepage;
    this.state = {
      open: false
      };
    this.editProduct = this.editProduct.bind(this);
    this.checkAdmin = this.checkAdmin.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  checkAdmin() {
    console.log("Inside checkadmin");
    if (this.props.appContext.state.userInfo["isAdmin"] === 1) {
      return (
        <Button onClick={event => this.editProduct(event)}>
          Delete Product
        </Button>
      );
    }
  }

  editProduct(event) {
    var apiBaseUrl = "http://localhost:4000/";
    var payload = {
      product_id: this.props.parentContext.product_id
    };
    console.log(payload);
    axios.post(apiBaseUrl + "editProductAdmin", payload).then(response => {
      if (response.data.code === 200) {
        alert("Product Successfully Deleted");
      }
    });
  }

  addToCart(event) {
    var apiBaseUrl = "http://localhost:4000/";
    var payload = {
      user_id: this.props.appContext.state.userInfo["id"],
      product_name: this.props.parentContext.product_name,
      price: this.props.parentContext.price,
      product_id: this.props.parentContext.product_id
    };
    console.log(payload);
    axios.post(apiBaseUrl + "ProductDetails", payload).then(response => {
      if (response.data.code === 200) {
        alert("Product Successfully Deleted");
      }
    });
  }

  componentDidMount() {
    console.log("into product details page" + this.props.parentContext);
  }
  render() {
    console.log("into product details page" + this.props.parentContext);

    return (
      <div className="product-details-div">
        <div className="product-details-img">
          {/* <img
            src={firebase
              .storage()
              .ref("avatars")
              .child("ArcReactor.jpg")
              .getDownloadURL()}
          /> */}
          <Image
            cloudName="kannan220"
            publicId={this.props.parentContext.product_name}
          />
        </div>
        <div className="product-details-p">
          <h2>{this.props.parentContext.product_name}</h2>
          <br />
          <p>
            <strong>{this.props.parentContext.product_desc}</strong>
          </p>
          <br />
          <p>
            <h5>Price: ${this.props.parentContext.price}</h5>
          </p>
          <br />
          <Counter
            parentContext={this.props.parentContext.quantity}
            price={this.props.parentContext.price}
            cLogin={this.props.appContext}
            pdetails={this.props.parentContext}
          />
          <br />

          <br />
          <Button type="submit" onClick={event => this.addToCart(event)}>
            Add to Cart{" "}
          </Button>
          <br />      
          {this.checkAdmin(this)}
        </div>
         
           {/* <Router>
           <Link to="/">Back to Homepage</Link>
             <Route exact path="/"  component={Homepage}/>
           </Router> */}
      </div>
    );
  }
}
