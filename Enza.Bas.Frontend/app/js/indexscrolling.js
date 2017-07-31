import React from 'react';
import ReactDOM from 'react-dom';
import AppScrolling from "./components/AppScrolling";
import {browserHistory, Router, Route, IndexRoute} from 'react-router'

//ReactDOM.render(<AppScrolling/>,    document.getElementById("app"))

/*
 * A error page component, client side 404 simulation
 * */
const NotFound = ()=>{
    return (
        <div className="err404">
            Sorry ! We couldn't find what you're looking for :(
        </div>
    )
}

//defining routes for our App
//* route is here for unknown path e.g., /abc , /xyz
let routes = (
    <Router history={browserHistory}>
        <Route path="/indexscrolling.html" component={AppScrolling}>
        </Route>
        <Route path="*" component={NotFound}/>
    </Router>
)
//let's render the routes to "app"
ReactDOM.render(routes, document.getElementById("app"))