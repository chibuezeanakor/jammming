import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter basename="/jammming"><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
