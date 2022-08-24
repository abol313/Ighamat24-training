import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Icon from './components/icons/check';
import IconEx from './components/icons/exclamation';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListTodos from './views/ListTodos';
import CreateTodo from './views/CreateTodo';
import Error404View from './views/errors/404';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ListTodos />} />
          <Route path="new" element={<CreateTodo />} />
        </Route>
        <Route path="*" element={<Error404View/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();