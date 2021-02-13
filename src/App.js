import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import {
  Home,
  SignUp,
  Friends
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/friends">
          <Friends />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
