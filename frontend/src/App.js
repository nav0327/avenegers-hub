import React, { Component } from 'react';
import './App.css';
import LoginScreen from './LoginScreen'
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    }
  }
  componentWillMount() {
    var loginPage = [];
    loginPage.push(<LoginScreen parentContext={this} />);
    this.setState({
      loginPage: loginPage
    })
    // console.log("check 1");
    // Axios.get("http://localhost:4000/routes/mongodb_connection_test")
    // .then(response => {
    //   console.log(response.data);
    // })
  } 
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
      </div>
    );
  }
}

export default App;