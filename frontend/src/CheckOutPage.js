import React, { Component } from "react";
import {
  Container,
  Form,
  Col,
  Button,
  Card,
  CardColumns,
  Row
} from "react-bootstrap";

import SubTotal from "./components/Subtotal/Subtotal";
import DeliveryCharges from "./components/DeliveryCharges/DeliveryCharges";
import Taxes from "./components/Taxes/Taxes";
import Total from "./components/Total/Total";

import ItemDetails from "./components/ItemDetails/ItemDetails";
import PromoCodeDiscount from "./components/PromoCodeDiscount/PromoCodeDiscount";

import { connect } from "react-redux";
import { handleChange } from "./actions/promoCodeActions";

import "./CheckOutPage.css";
import axios from "axios";

class CheckOutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      deliveryCharges: 10,
      taxes: 0,
      finalTotal: 0,
      disablePromoButton: false,
      userDetails: this.props.parentContext.state.userInfo,

      email: '',
      firstname: '',
      address: '',
      city: '',
      stateC: '',
      zip: '',
      userId: '',
      productIds: '',
      creditCardName: '',
      creditCardNumber: '',

      items: '',
      itemView: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentWillMount = () => {
    var apiBaseUrl = "http://localhost:4000/";
    var self = this;
    var totals = 0;
    
    var payload = {
      userId: this.state.userDetails["id"]
    };
    axios
      .post(apiBaseUrl + "checkOutPagePricing", payload)
      .then(response => {
        console.log(response.data);
        this.state.items = response.data;
        this.setState({
          items: response.data
        });
        console.log(this.state.items);
        this.state.items.map((item) =>

          totals += (item.price*item.quantity)
        );

        this.state.total = totals;
        this.state.taxes = this.state.total * 0.0875;
        this.state.finalTotal =
          this.state.total + this.state.deliveryCharges + this.state.taxes;

        this.setState({
          items: response.data,
          total: totals,
          taxes: this.state.total * 0.0875,
          finalTotal:
            this.state.total + this.state.deliveryCharges + this.state.taxes
        });
        console.log(this.state.items);
        var view = [];
        view.push(
          <ItemDetails price={this.state.total.toFixed(2)} itemContext={this} />
        );
        this.setState({
          itemView: view
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  giveDiscountHandler = () => {
    if (this.props.promoCode === "DISCOUNT") {
      this.setState(
        {
          finalTotal:
            (this.state.total + this.state.deliveryCharges + this.state.taxes) *
            0.9
        },
        function() {
          this.setState({
            disablePromoButton: true
          });
        }
      );
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  placeOrder(event) {
    console.log("Inside placeOrder");
    event.preventDefault();
    var apiBaseUrl = "http://localhost:4000/";
    var productIds = '';
    
    this.state.items.map((item) =>
    //productIds = checkProductName(productIds,item.product_names)
      productIds = productIds +',' + item.product_names
    );
    productIds = productIds.replace(',','');
    console.log(productIds);
    if (this.state.firstname === '')
      this.state.firstname = this.state.userDetails['first_name'];

    if (this.state.email === '')
      this.state.email = this.state.userDetails['email'];

    if (this.state.address === '')
      this.state.address = this.state.userDetails['address'];

    if (this.state.city === '')
      this.state.city = this.state.userDetails['city'];

    if (this.state.stateC === '')
      this.state.stateC = this.state.userDetails['state'];

    if (this.state.zip === '')
      this.state.zip = this.state.userDetails['zip'];

    if (this.state.creditCardName === '')
      this.state.creditCardName = this.state.userDetails['first_name'];


    var payload = {
      "user_id": this.state.userDetails['id'],
      "first_name": this.state.firstname,
      "email": this.state.email,
      "phoneNo": this.state.phoneNumber,
      "Address": this.state.address,
      "City": this.state.city,
      "State": this.state.stateC,
      "Zip": this.state.zip,
      "productIds": productIds,
      "creditCardName": this.state.creditCardName,
      "creditCardNumber": this.state.creditCardNumber,
      "totalPrice": this.state.finalTotal
    }
    console.log(payload);
    axios.post(apiBaseUrl + 'placeorder', payload)
      .then((response) => {
        console.log(response);
        if(response.data.code ==200){
          this.setState({
            total: 0,
            taxes: 0,
            finalTotal: 0
          })
        }
      })


  }


  render() {
    return (
      <div className="checkoutpage-container">
        <div className="user-details">
          <Form>
            <h2>Recepient Details</h2>
            <hr />
            <Form.Row>
              <Form.Group as={Col} controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                  defaultValue={this.state.userDetails["first_name"]}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formContactNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  name="phoneNumber"
                  onChange={this.handleChange}
                  placeholder="123456789"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  defaultValue={this.state.userDetails["email"]}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                onChange={this.handleChange}
                defaultValue={this.state.userDetails["address"]}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  onChange={this.handleChange}
                  defaultValue={this.state.userDetails["city"]}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="stateC"
                  onChange={this.handleChange}
                  defaultValue={this.state.userDetails["state"]}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="number"
                  name="zip"
                  onChange={this.handleChange}
                  defaultValue={this.state.userDetails["zip"]}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </div>

        <div className="purchase-card">
          <SubTotal price={this.state.total.toFixed(2)} />
          <DeliveryCharges price={this.state.deliveryCharges.toFixed(2)} />
          <Taxes taxes={this.state.taxes.toFixed(2)} />

          <hr />

          <Total price={this.state.finalTotal.toFixed(2)} itemContext={this} />

          {this.state.itemView}

          <hr />

          <PromoCodeDiscount
            giveDiscount={() => this.giveDiscountHandler()}
            isDisabled={this.state.disablePromoButton}
          />
        </div>

        <div className="credit-card-details">
          <Form onSubmit={e => this.placeOrder(e)} >
            <h2>Credit Card Details</h2>
            <hr />
            <Form.Group controlId="formCardName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="creditCardName"
                onChange={this.handleChange}
                defaultValue={this.state.userDetails["first_name"]}
              />
            </Form.Group>
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control required type="number" name="creditCardNumber" onChange={this.handleChange} placeholder="1234123412341234" />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formCardExpiry">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control type="date" placeholder="11/1111" />
              </Form.Group>

              <Form.Group as={Col} controlId="formCVV">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="number" placeholder="1111" />
              </Form.Group>
            </Form.Row>
            <Button className="formCardButton" type="submit">
              Make Payment
          </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  promoCode: state.promoCode.value
});

export default connect(
  mapStateToProps,
  { handleChange }
)(CheckOutPage);
