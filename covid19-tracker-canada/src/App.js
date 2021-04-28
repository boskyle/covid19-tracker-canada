import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Super from './components/Super/Super';
import './assets/fonts/index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>       
          <Route path='/' component={Super}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
