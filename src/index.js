import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './page/home';
import Register from './account/register';
import Login from './account/login';
import EditUserData from './account/EditUserData';
import UserArticle from './article/UserArticle';
import AddArticle from './article/AddArticle';
import EditArticle from './article/EditArticle';
import UserList from './page/userlist';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/EditUserData" element={<EditUserData />} />
        {}
        <Route path="/UserArticle/:userid" element={<UserArticle />} />
        {}
        <Route path="/AddArticle" element={<AddArticle />} />
        {}
        <Route path="/EditArticle/:userid" element={<EditArticle />} />
        {}
        <Route path="/UserList" element={<UserList />} />
        {}
        <Route path="Register" element={<Register />} />
        {}
        {}
        {}
        {}
        {}
        {}
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </HashRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
