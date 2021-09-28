import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ 
    isLoggedInt ,
    component:Component,
    ...rest
 }) => {
    return (
        <Route
            {...rest}
            component = {(props)=>(
                    (isLoggedInt)
                    ?(<Redirect to ="/"/>)
                    :(<Component { ...props}/> )
                )
            }

        />
    )
}
PublicRoute.prototype={
    isLoggedInt : PropTypes.bool.isRequired,
    component : PropTypes.func.isRequired

}