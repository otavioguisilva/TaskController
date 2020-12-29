import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import 'regenerator-runtime/runtime'


window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
};
