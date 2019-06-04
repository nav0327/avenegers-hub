import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import './userProfile.css';

class EditProductPage extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      parentCategoryDiv: [],
      subCategoryDiv: [],
      parentCategory: [],
      subCategory: [],
      parentCategoryValue: '',
      subCategoryValue: '',

      product_name: '',
      product_desc: '',
      product_price: '',
      product_qty: '',
      gender:'',
      category_id:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {

    console.log(this.props.itemDetails);
    var apiBaseUrl = "http://localhost:4000/";

    // axios.get(apiBaseUrl + 'fetchCategories')
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState({ parentCategory: response.data });
    //     var item = this.state.parentCategory.map((categor) =>
    //       <option value={categor.parent_category}>{categor.parent_category}</option>
    //     )
    //     var selectCategories = (
    //       <Form.Row>
    //         <Form.Group as={Col} md="4" controlId="parent_category">
    //           <Form.Label>Category</Form.Label>
    //           <Form.Control as="select"
    //             required
    //             placeholder="Category name"
    //             name="parentCategoryValue"
    //             onChange={this.handleCategoryChange}
    //             defaultValue={Array.from(this.state.parentCategory)[0]}
    //           >
    //             <option value=''></option>
    //             {item}
    //           </Form.Control>
    //         </Form.Group>
    //       </Form.Row>
    //     );
    //     this.setState({ parentCategoryDiv: selectCategories });

    //   })

    //   .catch(function (error) {
    //     console.log(error);
    //   })
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
      "parent_category": this.state.parentCategoryValue
    }
    console.log(payload);
    axios.post(apiBaseUrl + 'fetchSubCategories', payload)
      .then((response) => {
        console.log(response.data);
        this.setState({ subCategory: response.data });
        this.state.subCategoryValue = this.state.subCategory[0].category_id;

        var item = this.state.subCategory.map((sc) =>
          <option value={sc.category_id}>{sc.sub_category}</option>
        )

        var selectCategories = (
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="sub_category">
              <Form.Label>SubCategory</Form.Label>
              <Form.Control as="select"
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

      .catch(function (error) {
        console.log(error);
      })
  }

  handleSubmit(event) {
    var apiBaseUrl = "http://localhost:4000/";
    const form = event.currentTarget;
    event.preventDefault();
    var payload = {
      "product_name": this.state.product_name,
      "product_desc": this.state.product_desc,
      "price": this.state.product_price,
      "quantity": this.state.product_qty,
      "gender": this.state.gender,
      "category_id": this.state.subCategoryValue
    }

    axios.post(apiBaseUrl + 'addProduct', payload)
      .then((response) => {
        console.log(response.data);
        this.setState({ subCategory: response.data });
        //this.state.subCategoryValue = this.state.subCategory[0].category_id;

        var item = this.state.subCategory.map((sc) =>
          <option value={sc.category_id}>{sc.sub_category}</option>
        )

        var selectCategories = (
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="sub_category">
              <Form.Label>SubCategory</Form.Label>
              <Form.Control as="select"
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

      .catch(function (error) {
        console.log(error);
      })

  }

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
              <Form.Control as="select"
                name="subCategoryValue"
                onChange={this.handleChange}
              >
                <option value=''></option>
                {this.state.subCategoryDiv}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="Gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Select Gender"
                name="gender"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

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
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="4" controlId="Product Desc">
              <Form.Label>Product Description</Form.Label>
              <Form.Control as="textarea" rows="3" name="product_desc" onChange={this.handleChange}/>
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
            <Form.Group as={Col} md="4" controlId="product_img">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                required
                type="image"
                name="product_img"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>
          
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    );
  }
}

export default EditProductPage;