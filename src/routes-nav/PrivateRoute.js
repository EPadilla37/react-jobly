import React, {useContext} from "react";
import { Route, redirect } from "react-router-dom";
import UserContext from "../UserContext";

function PrivateRoute({exact, path, children}) {
    const {currentUser} = useContext(UserContext); 

    console.debug(
        "PrivateRoute",
        "exact=", exact,
        "path=", path,
        "currentUser=", currentUser,
    );

    if(!currentUser){
        return <redirect to="/login"/>;
    }
    return(
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;