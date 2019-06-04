import React, { Component } from 'react';
import "./login.css"
import axios from 'axios';
import UploadScreen from './UploadScreen';
import Homepage from './homepage';

class LoginScreenNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClass: false,
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            firstname: '',
            middlename: '',
            lastname: '',
            userInfo:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    signin() {
        this.setState({ addClass: false });
    }
    signup() {
        this.setState({ addClass: true });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        let boxClass = ["container"];
        if (this.state.addClass) {
            boxClass = ["container right-panel-active"];
        }
        else {
            boxClass = ["container"];
        }
        return (
            <div className={boxClass.join(' ')} id="container">
                <div className="form-container sign-up-container">
                    <form action="#" method = "post">
                        <h1>Create Account</h1>
                        <input  required type="text" placeholder="Enter First Name" name="firstname" onChange={this.handleChange} />
                        <input required type="text" placeholder="Enter Last Name" name="lastname" onChange={this.handleChange} />
                        <input required type="text" placeholder="Enter Middle Name" name="middlename" onChange={this.handleChange} />
                        <input required type="email" placeholder="Email" name="email" onChange={this.handleChange} />
                        <input required type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                        <input required type="password" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange} />
                        <button onClick={(event) => this.registerUser(event)}> Sign Up </button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form action="#" method = "post">
                        <h1>Sign in</h1>
                        <input type="email" placeholder="Email" name="username" onChange={this.handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                        <a href="#">Forgot your password?</a>
                        <button onClick={(event) => this.loginUser(event)}>Sign In</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                To keep connected with us please login with your personal info
                            </p>
                            <button className="ghost" id="signIn" onClick={this.signin.bind(this)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={this.signup.bind(this)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    loginUser(event) {
        event.preventDefault();
        var apiBaseUrl = "http://localhost:4000/";
        var self = this;
        var payload = {
            "email": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + 'login', payload)
            .then((response) => {
                console.log(response);
                
                if (response.data.code === 200) {
                    console.log("Login successfull");
                    console.log(response.data.user);
                    this.setState({ userInfo: response.data.user });
                    console.log(this.state.userInfo);
                    var uploadScreen = [];
                    uploadScreen.push(<Homepage appContext={this} />);
                    this.props.parentContext.setState({ loginPage: [], uploadScreen: uploadScreen });
                }
                else if (response.data.code === 204) {
                    console.log("Username password do not match");
                    alert("username password do not match");
                }
                else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    registerUser(event) {
        if(this.state.firstname ==='' || this.state.lastname==='' || this.state.email ==='', this.state.password==='' ){
            alert("Please fill all the fields");
        }
        else{
            event.preventDefault();
        var apiBaseUrl = "http://localhost:4000/";
        var self = this;
        console.log("values", this.state.firstname, this.state.lastname, this.state.email, this.state.password);
        if(this.state.password === this.state.confirmPassword){
            var payload = {
                "first_name": this.state.firstname,
                "last_name": this.state.lastname,
                "middle_name": this.state.middlename,
                "email": this.state.email,
                "password": this.state.password,
                "isAdmin": false
            }
    
            axios.post(apiBaseUrl + 'register', payload)
                .then(function (response) {
                    console.log(response);
                    if (response.data.code > 0) {
                        alert(response.data.message);
                        var loginscreen = [];
                        loginscreen.push(<LoginScreenNew parentContext={this} />);
                        self.setState({
                            addClass: false,
                            username: '',
                            password: '',
                            email: '',
                            firstname: '',
                            middlename: '',
                            lastname: ''
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }else{
            alert("Password and Confirm Password not matching. Enter again");
        }  
        }
              
    }
}

export default LoginScreenNew;