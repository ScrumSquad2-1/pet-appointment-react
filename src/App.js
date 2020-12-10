import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import EditListing from './components/EditListing';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

function App() {
  
  return (
    <div className="container-fluid">
      <h1>Appointment Management</h1>

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
