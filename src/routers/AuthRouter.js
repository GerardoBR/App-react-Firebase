import React from 'react'
// import { Redirect } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen'
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { RegistrerScreen } from '../components/auth/RegistrerScreen'

export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-cointainer">
                <Switch>
                    <Route exact path= "/auth/login" component = { LoginScreen }></Route>
                    <Route  exact path= "/auth/register" component = {RegistrerScreen}></Route>
                    <Redirect to ="/auth/login"/>
                </Switch>
            </div>
        </div>
    )
}
