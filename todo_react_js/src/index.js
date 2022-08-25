import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Icon from './components/icons/check';
import IconEx from './components/icons/exclamation';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ListTodosView from './views/ListTodosView';
import CreateTodoView from './views/CreateTodoView';
import UpdateTodoView from './views/UpdateTodoView';
import Error404View from './views/errors/404View';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ListTodosView />} />
          <Route path="new" element={<CreateTodoView />} />
          <Route path="edit/:id" element={<UpdateTodoView />}/>
        </Route>
        <Route path="/404" element={<Error404View/>}/>
        <Route path="*" element={<Navigate to="/404" replace={true}/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();