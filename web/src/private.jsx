import React, {  useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import StoreContext from './components/Store/context';

const RoutesPrivate = ({ component: Component, ...rest }) => {
    const { token } = useContext(StoreContext);

    return (
        <Route
        {...rest}
        render={() => token
            ? <Component {...rest}/>
            : <Redirect to ="/" />
        }
        />
    )
}

export default RoutesPrivate;