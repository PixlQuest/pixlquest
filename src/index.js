import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './componets/App';
import registerServiceWorker from './registerServiceWorker';
dotenv.config();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
