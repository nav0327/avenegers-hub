import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./userProfile.css";

import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import config from "./firebase-config";

firebase.initializeApp(config);

class AddProductPage extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      parentCategoryDiv: [],
      subCategoryDiv: [],
      parentCategory: [],
      subCategory: [],
      parentCategoryValue: "",
      subCategoryValue: "",
      sizeValue: "",

      product_name: "",
      product_desc: "",
      product_price: "",
      product_qty: "",
      gender: "",
      category_id: "",
      size: "",
      brand: "",

      image: "",
      imageURL: "",
      progress: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    var apiBaseUrl = "http://localhost:4000/";

    axios
      .get(apiBaseUrl + "fetchCategories")
      .then(response => {
        console.log(response.data);
        this.setState({ parentCategory: response.data });
        var item = this.state.parentCategory.map(categor => (
          <option value={categor.parent_category}>
            {categor.parent_category}
          </option>
        ));
        var selectCategories = (
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="parent_category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                required
                placeholder="Category name"
                name="parentCategoryValue"
                onChange={this.handleCategoryChange}
                defaultValue={Array.from(this.state.parentCategory)[0]}
              >
                <option value="" />
                {item}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        );
        this.setState({ parentCategoryDiv: selectCategories });
      })

      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCategoryChange(e) {
    var apiBaseUrl = "http://localhost:4000/";

    this.state.parentCategoryValue = e.target.value;

    var payload = {
      parent_category: this.state.parentCategoryValue
    };
    console.log(payload);
    axios
      .post(apiBaseUrl + "fetchSubCategories", payload)
      .then(response => {
        console.log(response.data);
        this.setState({ subCategory: response.data });
        this.state.subCategoryValue = this.state.subCategory[0].category_id;

        var item = this.state.subCategory.map(sc => (
          <option value={sc.category_id}>{sc.sub_category}</option>
        ));

        var selectCategories = (
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="sub_category">
              <Form.Label>SubCategory</Form.Label>
              <Form.Control
                as="select"
                name="subCategoryValue"
                onChange={this.handleChange}
              >
                {item}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        );
        //this.setState({ subCategoryDiv: selectCategories });
        this.setState({ subCategoryDiv: item });

        if (
          this.state.parentCategoryValue == "clothing" ||
          this.state.parentCategoryValue == "clothing"
        ) {
          var csizeValue = (
            <Form.Group as={Col} md="4" controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control
                as="select"
                type="text"
                placeholder="Select Size"
                name="size"
                onChange={this.handleChange}
              >
                <option value="XS">Extra Small</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </Form.Control>
            </Form.Group>
          );
          this.setState({ sizeValue: csizeValue });
        } else {
          var eValue = (
            <Form.Group as={Col} md="4" controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control
                as="select"
                type="text"
                placeholder="Select Size"
                name="size"
                onChange={this.handleChange}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="N">Not Applicable</option>
              </Form.Control>
            </Form.Group>
          );
          this.setState({ sizeValue: eValue });
        }
      })

      .catch(function(error) {
        console.log(error);
      });
  }

  handleSubmit(event) {
    var apiBaseUrl = "http://localhost:4000/";
    const form = event.currentTarget;
    event.preventDefault();
    var payload = {
      product_name: this.state.product_name,
      product_desc: this.state.product_desc,
      price: this.state.product_price,
      quantity: this.state.product_qty,
      gender: this.state.gender,
      category_id: this.state.subCategoryValue,
      size: this.state.size,
      brand: this.state.brand
    };

    axios
      .post(apiBaseUrl + "addProduct", payload)
      .then(response => {
        console.log(response.data);
        this.setState({ subCategory: response.data });
        //this.state.subCategoryValue = this.state.subCategory[0].category_id;

        var item = this.state.subCategory.map(sc => (
          <option value={sc.category_id}>{sc.sub_category}</option>
        ));

        var selectCategories = (
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="sub_category">
              <Form.Label>SubCategory</Form.Label>
              <Form.Control
                as="select"
                name="subCategoryValue"
                onChange={this.handleChange}
              >
                {item}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        );
        //this.setState({ subCategoryDiv: selectCategories });
        this.setState({ subCategoryDiv: item });
      })

      .catch(function(error) {
        console.log(error);
      });
  }

  handleUploadStart = () => {
    this.setState({
      progress: ""
    });
  };

  handleUploadSuccess = filename => {
    this.setState({
      image: filename,
      progress: "Upload successful"
    });
    firebase
      .storage()
      .ref("avatars")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imageURL: url }));
  };

  render() {
    const { validated } = this.state;
    return (
      <div className="profileClass">
        <h3>Add Product</h3>
        <Form onSubmit={e => this.handleSubmit(e)}>
          {this.state.parentCategoryDiv}

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="sub_category">
              <Form.Label>SubCategory</Form.Label>
              <Form.Control
                as="select"
                name="subCategoryValue"
                onChange={this.handleChange}
              >
                <option value="" />
                {this.state.subCategoryDiv}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                onChange={this.handleChange}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="N">Not Applicable</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>{this.state.sizeValue}</Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="product_name">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Product Name"
                name="product_name"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="brand">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                as="select"
                required
                type="text"
                placeholder="Enter Product Name"
                name="brand"
                onChange={this.handleChange}
              >
                <option value="ironman">Ironman</option>
                <option value="thor">Thor</option>
                <option value="hulk">Hulk</option>
                <option value="hawk">Hawk</option>
                <option value="captain_america">Captain America</option>
                <option value="black_widow">Black Widow</option>
                <option value="groot">Groot</option>
                <option value="rocket">Rocket</option>
                <option value="others">Others</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="Product Desc">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="product_desc"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="product_price">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                required
                type="number"
                precision={2}
                step={0.1}
                placeholder="Enter Product Price"
                name="product_price"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="product_qty">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter quantity of Product"
                name="product_qty"
                max={100}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <br />
          <div>
            <FileUploader
              accept="image/*"
              name="image"
              storageRef={firebase.storage().ref("avatars")}
              onUploadStart={this.handleUploadStart}
              onUploadSuccess={this.handleUploadSuccess}
            />
            <br />
            <label>Progress:</label>
            <p>{this.state.progress}</p>
            <br />
            {/* {this.state.image && (
              <img className="uploadedImage" src={this.state.imageURL} />
            )} */}
          </div>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    );
  }
}

export default AddProductPage;
