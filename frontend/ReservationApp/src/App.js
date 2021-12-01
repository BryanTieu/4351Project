import React, { useState } from 'react';
import './index.css';
import ReservationPage from './pages/ReservationPage';
import { Route, Switch } from "react-router-dom"
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ConfirmationPage from './pages/ConfirmationPage';

const App = () => {

    return (
        <Switch>
            
            <Route exact path="/">
                <HomePage />
            </Route>

            <Route path="/Login">
                <LoginPage />
            </Route>

            <Route path="/Reservation">
                <ReservationPage />
            </Route>

            <Route path="/Confirmation">
                <ConfirmationPage />
            </Route>

        </Switch>
    );

}

export default App;