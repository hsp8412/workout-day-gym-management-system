import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Products from "./pages/browseProducts";

function App() {
  return (
    <div>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
