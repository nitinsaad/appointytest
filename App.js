import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Home from './Home';
import Details from './Details'
import { HashRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/Details" component={Details} />
      </HashRouter>
    </div>
  );
}

export default App;
