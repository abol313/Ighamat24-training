// import logo from './logo.svg';
import './assets/main.scss';
import ListTodos from './views/ListTodos';
import  {BrowserRouter, Link, Routes, Route, Outlet} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome To Todo Proj !</h1>
      </header>

      
      <nav v-if="!this.isNotFoundPage">
        <ul>
          <li>
            <Link to="/new">
              <h2>Create A Todo</h2>
            </Link>
          </li>
          <li>
            <Link to="/">
              <h2>List Todos</h2>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet/>
      {/* <ListTodos/> */}
    </div>
  );
}

export default App;
