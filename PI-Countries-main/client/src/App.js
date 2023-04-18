import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import NewActivity from "./components/formActivity/NewActivity";
import Detail from "./components/Detail";
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/'



function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route path= '/Home' component={Home}/>
        <Route exact path= '/Country' component={NewActivity }/>
        <Route path= '/detail' component={Detail}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
