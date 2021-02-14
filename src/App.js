import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Home, Interests, SignIn, Profile, Friends, Dashboard } from "./pages";
import UserProvider from "./providers/UserProvider";

// import config from './services/config';
import Firebase from "firebase";
// Firebase.initializeApp(config.firebaseConfig)

Firebase.database().ref("/").set("test");
console.log("DATA SAVED");

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/interests">
            <Interests />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/friends">
            <Friends />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
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
