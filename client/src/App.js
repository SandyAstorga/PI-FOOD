import './App.css';
import { Route } from 'react-router-dom';
import { Landing, Home, Form, Detail, About } from './components/indexcomponents' 
import axios from 'axios';
axios.defaults.baseURL = 'https://pi-food-production-d882.up.railway.app/'
// axios.defaults.baseURL = 'http://localhost:3001'

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/about" component={About} />
      <Route exact path="/detail/:id" component={Detail} />
    </div>
  );
}

export default App;
