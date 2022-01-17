import React, { Component } from 'react';
import Profile from './Profile';
import Account from './Account';
import { Route, Routes } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/account/authenticated" element={<Account />} />
            </Routes>
        )
    }
}

export default App;