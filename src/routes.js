import React from "react";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Landing from "./Pages/Landing/Landing"
import MainPage from "./Pages/UploadAndSearchPage/UploadAndSearch"
import LookFilePage from "./Pages/LookFile/LookFile"
import Profile from "./Pages/Profile/Profile"

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>    
                <Route path="/Main" exact component={MainPage}/>
                <Route path="/LookFile/:User/:File/:Dev" exact component={LookFilePage}/>
                <Route path="/Profile" exact component={Profile}/>
                <Route path="*"/>
            </Switch>
        </BrowserRouter>
        
    )
    
}

export default Routes;