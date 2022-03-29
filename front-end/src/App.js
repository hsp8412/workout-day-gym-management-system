import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Products from "./pages/browseProducts";
import Login from "./pages/login";
import ShoppingCart from "./pages/shoppingCart";

function App() {
  return (
    <div>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
