import LoginForm from "./components/loginform";
import RegisterForm from "./components/registerform";
import ForgotForm from "./components/forgotform";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/forgot" element={<ForgotForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
