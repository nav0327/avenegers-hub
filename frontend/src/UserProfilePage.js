import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./userProfile.css";

class UserProfilePage extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      userDetails: this.props.parentContext.state.userInfo,
      email: "",
      firstname: "",
      middlename: "",
      lastname: "",
      address: "",
      city: "",
      stateD: "",
      zip: "",
      userId: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setFields() {
    console.log("setFields");
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (this.state.firstname === "") {
      this.state.firstname = this.state.userDetails["first_name"];
    }

    if (this.state.middlename === "") {
      this.state.middlename = this.state.userDetails["middle_name"];
    }

    if (this.state.lastname === "") {
      this.state.lastname = this.state.userDetails["last_name"];
    }

    if (this.state.email === "")
      this.state.email = this.state.userDetails["email"];

    if (this.state.address === "")
      this.state.address = this.state.userDetails["address"];

    if (this.state.city === "")
      this.state.city = this.state.userDetails["city"];

    if (this.state.stateD === "")
      this.state.stateD = this.state.userDetails["state"];

    if (this.state.zip === "") this.state.zip = this.state.userDetails["zip"];

    this.setState({ validated: true });

    event.preventDefault();

    var apiBaseUrl = "http://localhost:4000/";
    var self = this;
    var payload = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      middlename: this.state.middlename,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.stateD,
      zip: this.state.zip,
      userId: this.state.userDetails["id"]
    };
    axios
      .post(apiBaseUrl + "userProfile", payload)
      .then(response => {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Update successful");
        } else {
          console.log("Error");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { validated } = this.state;
    return (
      <div className="profileClass-container">
        <div className="profileClass">
          <Form onSubmit={e => this.handleSubmit(e)} onLoad={this.setFields}>
            <h3>User Profile</h3>
            <hr />
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="first_name">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue={this.state.userDetails["first_name"]}
                  name="firstname"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="middle_name">
                <Form.Label>Middle name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Middle name"
                  defaultValue={this.state.userDetails["middle_name"]}
                  name="middlename"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="last_name">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  defaultValue={this.state.userDetails["last_name"]}
                  name="lastname"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="email">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Email ID"
                  defaultValue={this.state.userDetails["email"]}
                  name="email"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    disabled
                    defaultValue={this.state.userDetails["email"]}
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Street/AptNo"
                  name="address"
                  onChange={this.handleChange}
                  defaultValue={this.state.userDetails["address"]}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={this.handleChange}
                  defaultValue={this.state.userDetails["city"]}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="stateD"
                  onChange={this.handleChange}
                  defaultValue={this.state.userDetails["state"]}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Zip"
                  name="zip"
                  onChange={this.handleChange}
                  defaultValue={this.state.userDetails["zip"]}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Button type="submit">Submit form</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default UserProfilePage;
