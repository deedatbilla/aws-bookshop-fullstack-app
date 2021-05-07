import React from 'react'
import {Route, Redirect } from 'react-router-dom';
import {useAppContext} from '../Context/Context';


const PublicRoute = ({component:Component,restricted, ...rest}) => {
    const context=useAppContext();
    const {isLoggedIn}=context
    return (
      <Route
        {...rest}
        render={props=>
            isLoggedIn && restricted ? (
                <Redirect to ='/dashboard' />
            ) : (
                <Component {...props} />
            )

        }







      />
    )
}

export default PublicRoute
