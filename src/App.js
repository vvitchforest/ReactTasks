import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';


const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Nav />
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route pat="/single" component={Single}/>
      </Switch>
    </Router>
  );
};

export default App;
