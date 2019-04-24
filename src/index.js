import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Login/Login';
import Contact from './Contact/Contact'
import 'bootstrap/dist/css/bootstrap.css';



const routing = (
    <Router>
      <div> 
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/contact-list"
          render= {
            () =>  checkAuthentication() ? <Contact />: <Redirect to="/login?referer=/contact-list"/> 
          }
        />
        </div>
    </Router>
  ) 

const checkAuthentication = () => {
  const cookieString = document.cookie.split(";")
  const authCookie = cookieString.find( _ => _.indexOf("authenticated") > -1);

  if(authCookie) {
    const val = authCookie.split("=");
    return val.length > 0 && val[1] === 'true'
  }

  return false;
}



ReactDOM.render(routing, document.getElementById('root'));


