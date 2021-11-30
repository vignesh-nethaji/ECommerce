import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import HomePage from "./ZeroDotOne/Homepage";
import CreateProduct from "./ZeroDotOne/CreateProduct"
import 'bootstrap/dist/css/bootstrap.css';
import AddCategory from './ZeroDotOne/AddCategory';
import UserDetails from './UserDetails';
import UserAdded from './UserAdded';
import ProductDetails from './ZeroDotOne/ProductDetails';



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route path="/SignUpPage" element={<SignUpPage />}></Route>
          <Route path="/ZeroDotOne/CreateProduct" element={<CreateProduct />}></Route>
          <Route path="/ZeroDotOne/HomePage" element={<HomePage />}></Route>
          <Route path="/ZeroDotOne/UserDetails" element={<UserDetails />}></Route>
          <Route path="/ZeroDotOne/AddCategory" element={<AddCategory />}></Route>
          <Route path="/ZeroDotOne/AddUser" element={<UserAdded />}></Route>
          <Route path="/ZeroDotOne/ProductDetails" element={<ProductDetails />}></Route>

        </Routes>
      </Router>
    </div>

  );
}

export default App;
