import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Contact from './Contact/Contact'
import 'bootstrap/dist/css/bootstrap.css';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/contact-list" component={Contact} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));


