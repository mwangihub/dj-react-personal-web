import './vendor/bootstrap.min.css';
import './vendor/App.css';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'


const wrappedApp = (
    <Provider store={store}>
            <BrowserRouter><App /></BrowserRouter>
    </Provider>
)

ReactDOM.render(wrappedApp, document.getElementById('root'));