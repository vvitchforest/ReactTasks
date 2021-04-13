import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';
import Upload from './views/Upload';
import {MediaProvider} from './contexts/MediaContext';
import MyFiles from './views/MyFiles';


const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MediaProvider>
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/single" component={Single}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/upload" component={Upload}/>
          <Route path="/myfiles" component={MyFiles}/>
        </Switch>
      </MediaProvider>
    </Router>
  );
};

export default App;
