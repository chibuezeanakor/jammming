import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<StaticRouter basename="/jammming"><App /></StaticRouter>, document.getElementById('root'));
registerServiceWorker();
