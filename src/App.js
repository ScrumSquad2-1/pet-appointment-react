import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Custom.css';
import Home from './components/Home';
import EditListing from './components/EditListing';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Topbar from './components/Topbar';

function App() {
  
  return (
    <div>
      <Topbar />

      <Router>
        
        <Switch>

          <Route path="/edit" render={(props) => <EditListing {...props}/>}/>
          <Route path="/">
            <Home />
          </Route>

        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
