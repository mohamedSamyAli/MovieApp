import logo from './logo.svg';
import './App.css';
import {MainHeader} from "./components/main.header.component/index"
import { getMoviesByTypeAndPage } from './services/movie.services';

function App() {

  return (
    <div className="App">
      <MainHeader/>
      
    </div>
  );
}

export default App;
