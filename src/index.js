import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginForm from "./components/loginform";
import RegisterForm from "./components/registerform";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />}>
        <Route path="registerform" element={<RegisterForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
