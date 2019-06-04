import React, { Component } from "react";
import "./App.css";
import Example from "./carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import IntoCategory from "./intoCategory";
import "./homepage.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import FilterBar from "./filterBar.js";
import LoginScreenNew from "./LoginScreen";
import { Route, NavLink, HashRouter } from "react-router-dom";
import UserProfilePage from "./UserProfilePage";
import CheckOutPage from "./CheckOutPage";
import AddProductPage from "./AddProductPage";
import user from "./images/user.png";
import ProductDetails from "./ProductDetails";
import OrderDetails from "./OrderDetails";

class Homepage extends Component {
  constructor(props) {
    super(props);
    var content;
    this.state = {
      category: [],
      mainDiv: [],
      carousel: [],
      control: "main",
      mainCategory: [],
      navBar: [],
      key: "",
      searchString: ""
    };
    this.userProfile = this.userProfile.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.checkAdmin = this.checkAdmin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.orderHistory = this.orderHistory.bind(this);
    this.basestate = this.state;
    this.userinfo = this.props.appContext.state;
    this.logincontext = this.props.appContext;
  }

  resetHome(){
    this.setState(this.basestate);
  }
  componentDidMount() {
    console.log("reached frontend homepage.js");
    var carousel = [];
    carousel.push(<Example />);
    this.setState({
      carousel: carousel
    });
    Axios.get("http://localhost:4000/homepage")
      .then(response => {
        console.log(response.data);
        this.setState({ category: response.data });
        console.log(this.state.category);
        if (this.state.control == "main") {
          var item = this.state.category.map(categor => (
            <li onClick={() => this.handleClick(categor)}>
              {categor}
            </li>
          ));
          var mainBody = <ul id="category">{item}</ul>;
          var mainNav = <ul>{item}</ul>;
          console.log(mainBody);
          this.setState({ mainDiv: mainBody });
          this.setState({ navBar: mainNav });
          this.setState({ control: "loadedmain" });
        }
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

  handleClick(key) {
    console.log("handle click");
    console.log(key);
    this.state.key = key;
    console.log("state key");
    console.log(this.state.key);
    var intoCategory;
    this.setState({ mainCategory: key });
    //this.state.mainCategory=key;
    console.log("test");
    console.log(this.state.mainCategory);
    //intoCategory=(<IntoCategory parentContext={this.state.mainCategory}/>)

    console.log("front end state");
    console.log(this.state);
    var mainBody = (
      <div>
        <FilterBar
          parentContext={this.state}
          childContext={this.logincontext}
        />
      </div>
    );
    this.setState({ mainDiv: mainBody });
  }

  checkAdmin() {
    if (this.userinfo.userInfo["isAdmin"] === 1) {
      return (
        <NavDropdown.Item
          href="#addProduct"
          onClick={event => this.addProduct(event)}
        >
          Add Product
        </NavDropdown.Item>
      );
    }
  }
  render() {
    console.log("category");
    console.log(this.state.control);
    return (
      <div className="homepage">
        {/* <div className = "main123"> */}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <a href="#home">
              <img
                onClick={event => this.homeScreenPage(event)}
                width={100}
                height={100}
                alt="thumbnail"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Symbol_from_Marvel%27s_The_Avengers_logo.svg"
              />
            </a>
          </Navbar.Brand>
          <Form inline className="searchBar">
            <FormControl
              type="text"
              placeholder="Search"
              name="searchString"
              className="mr-sm-2"
              onChange={this.handleChange}
            />
            <Button
              variant="outline-success"
              onClick={event => this.searchKeyword(event)}
            >
              Search
            </Button>
          </Form>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="User Info" id="basic-nav-dropdown">
                <NavDropdown.Item
                  href="#orderHistory"
                  onClick={event => this.orderHistory(event)}
                >
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#userProfile"
                  onClick={event => this.userProfile(event)}
                >
                  Profile
                </NavDropdown.Item>
                {this.checkAdmin(this)}
                <NavDropdown.Divider />
                <NavDropdown.Item href="LoginScreen.js">
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                href="#cart"
                onClick={event => this.checkOutPage(event)}
              >
                Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.carousel}
        {this.state.mainDiv}
      </div>
    );
  }

  userProfile(event) {
    console.log("User Profile clicked");
    var main = [];
    main.push(<UserProfilePage parentContext={this.props.appContext} />);
    this.setState({
      carousel: [],
      mainDiv: main
    });
  }

  checkOutPage(event) {
    console.log("Arrived at Check Out Page");
    var main = [];
    main.push(<CheckOutPage parentContext={this.props.appContext} />);
    this.setState({
      carousel: [],
      mainDiv: main
    });
  }

  addProduct(event) {
    console.log("Add Product clicked");
    var main = [];
    main.push(<AddProductPage parentContext={this.props.appContext} />);
    this.setState({
      carousel: [],
      mainDiv: main
    });
  }

  productDetailsPage(event) {
    console.log("Arrived at Product Details Page");

    var main = [];
    main.push(<ProductDetails parentContext={this.props.appContext} />);
    this.setState({
      carousel: [],
      mainDiv: main
    });
  }

  homeScreenPage(event) {
    console.log("Arrived at Home Screen Page");
  }
  searchKeyword(event) {
    // console.log("Search");
    // var apiBaseUrl = "http://localhost:4000/";
    // var payload = {
    //   searchKeyword: this.state.searchString
    // };
    // // var main = [];
    // // main.push(<AddProductPage parentContext = {this.props.appContext} />);
    // // this.setState({
    // //     carousel: [],
    // //     mainDiv: main
    // // })

    // Axios.post(apiBaseUrl + "search", payload)
    //   .then(response => {
    //     console.log(response.data);
    //     var mainBody = (
    //       <div>
    //         <FilterBar parentContext={response.data} />
    //       </div>
    //     );
    //     this.setState({ mainDiv: mainBody });
    //   })

    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }

  orderHistory(event) {
    console.log("User Profile clicked");
    var main = [];

    main.push(<OrderDetails parentContext={this.props.appContext} />);
    //main.push(<CustomizedTable parentContext={this.props.appContext.state.userInfo['id']} />);
    this.setState({
      carousel: [],
      mainDiv: main
    });
  }
}

export default Homepage;
