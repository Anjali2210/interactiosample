import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props)

        console.log(props)

        this.state = {
            username: "",
            password: "",
            status: "false",
            authtok :"",
            error: false
        };
    }

    handleUserNameChange = (e) => {
        this.setState({ username: e.target.value })
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }


    postData = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        console.log(username)
        console.log(password)


       

        let data = {
            username: username,
            password: password
        }

        let axiosConfig = {
            headers:
            {
                "Accept": "application/json",
                'Content-Type': 'application/json; charset=UTF-8',
                //"Access-Control-Allow-Origin": "*",
            }
        }

        axios.post('https://internal-api-staging-lb.interact.io/v2/login', data, axiosConfig)
            .then(response => 
                {
                    if (response.status === 200) {        
                        document.cookie = "authenticated=true";
                        localStorage.setItem("authtoken", response.data.token.authToken)
                        this.props.history.replace('/contact-list');
                    }
                }
            ).catch((err) => {
                console.log('failed to fetch')
                this.setState({error: true})
            })

    }
    render() {

        return (
            <div className="container d-flex justify-content-center">
                <div className="login">
                    <h1 className="text-center login-title">CRM LOGIN</h1>
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" id="username" value={this.state.username} name="username" onChange={this.handleUserNameChange} placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value={this.state.password} id="password" onChange={this.handlePasswordChange} placeholder="Password" />
                        </div>
                        <button type="submit" onClick={this.postData} className="btn btn-primary btn-lg btn-block login-btn">Login</button>
                        {this.state.error && 
                        <div className="alert alert-danger text-center mt-2" role="alert">
                            Incorrect Username or Password
                        </div>}
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;