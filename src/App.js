import logo from './logo.svg';
import './App.css';
import { MainHeader } from "./components/main.header.component/index"
import { MainPage } from "./pages/home"
import { FavoritsPage } from "./pages/favourit"


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {

  return (
    <div className="App">


      <Router>
      <MainHeader />
      <Switch>
          <Route path="/home">
            <MainPage />
          </Route>
          <Route path="/favorits">
          <FavoritsPage />
          </Route>
          <Route path="/">
          <Redirect to="/home"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
