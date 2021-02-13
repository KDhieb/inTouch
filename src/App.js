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
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default App;
