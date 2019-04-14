import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            status: "false"
        };
    }

    handleUserNameChange = (e) => {
        this.setState({ username: e.target.value })
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    reDirectToSuccess = () => {
        return (
            <Redirect to={'/contact-list'} />
        )
    }


    postData = event => {
        event.preventDefault();
        const { username, password } = this.state;
        console.log(username)
        console.log(password)
        fetch('https://internal-api-staging-lb.interact.io/v2/login', {
            method: 'POST',
            mode: 'cors',
            headers:
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(response => {
            if (response.status === 200) {
                this.setState({ status: true })
            }
        }).catch((err) => {
            console.log('failed to fetch')
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
                    </form>
                    {this.state.status && (
                        <Redirect to={'/contact-list'} />
                    )}
                </div>
            </div>
        )
    }
}

export default Login;