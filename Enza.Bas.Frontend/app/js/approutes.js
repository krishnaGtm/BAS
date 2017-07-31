import React,{Component} from 'react';
import App from "./components/App";
import AppScrolling from "./components/scrolling/AppScrolling";
import Tabledata from './components/Tabledata'
import Myselection from './components/myselection'
import Groups from './components/groups'
import Trials from './components/trials'
import TrialProperties from './components/trialProperties'
import TrialLines from './components/trialLines'
import Trialbook from './components/Trialbook'
import NewTrialbook from './components/newTrial'
import Crossing from './components/Crossing'
import TreeChart from './components/treeChart'
import Tiles from './components/Tiles'
import NotFound from './components/NotFound'
import {browserHistory, Router, Route, IndexRoute} from 'react-router'


 function AppRoutes() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Tiles}/>
            <Route path="/main" name="mainApp" component={App}>
                <IndexRoute name="tableData" component={Tabledata}/>

                <Route path="/main/selection" name="myselection" component={Myselection}/>
                <Route path="/main/groups" name="groups" component={Groups}/>
                <Route path="/main/trials" name="trials" component={Trials}/>
                <Route path="/main/trials/properties" name="trialProperties" component={TrialProperties}/>
                <Route path="/main/trials/:id" name="trialLines" component={TrialLines}/>
                <Route path="/main/trialbook" name="trialbook" component={Trialbook}/>
                <Route path="/main/newTrialbook/:id" name="newTrialbook" component={NewTrialbook}/>
                <Route path="/main/crossing" name="crossing" component={Crossing}/>
                <Route path="/main/hierarchy/:id" name="treeChart" component={TreeChart}/>
            </Route>
            <Route path="/scrolling" component={AppScrolling}/>
            <Route path="*" component={NotFound}/>
        </Router>
    )
}

export default AppRoutes;