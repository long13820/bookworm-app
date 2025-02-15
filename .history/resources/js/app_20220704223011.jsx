import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/resources/assets/css/style.css';
import './index.css';


ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
