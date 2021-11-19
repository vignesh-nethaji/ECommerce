import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import HomePage from "./ZeroDotOne/Homepage";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route path="/SignUpPage" element={<SignUpPage />}></Route>
          <Route path="/ZeroDotOne/HomePage" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
