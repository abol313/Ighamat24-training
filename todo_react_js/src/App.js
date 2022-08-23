// import logo from './logo.svg';
import './App.css';
import ListTodos from './views/ListTodos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome To Todo Proj !</h1>
      </header>

      <nav v-if="!this.isNotFoundPage">
        <ul>
          <li>
            <router-link to="/new">
              <h2>Create A Todo</h2>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <h2>List Todos</h2>
            </router-link>
          </li>
        </ul>
      </nav>

      <ListTodos/>
    </div>
  );
}

export default App;
