import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Products from "./pages/browseProducts";
import Login from "./pages/login";
import ShoppingCart from "./pages/shoppingCart";
import Orders from "./pages/orders";
import BranchManagement from "./pages/branchManagement";
import Customer from "./pages/customer";
import Product from "./pages/product";
import Facility from "./pages/facility";
import Staff from "./pages/staff";
import Locker from "./pages/locker";
import CommonFacility from "./pages/commonFacility";
import Profile from "./pages/profile";
import ATable from "./components/atable";
import Appointment from "./pages/appointments";

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
          <Route path="/orders" element={<Orders />} />
          <Route path="/branch" element={<BranchManagement />} />
          <Route path="/branch/customer" element={<Customer />} />
          <Route path="/branch/product" element={<Product />} />
          <Route path="/branch/facility" element={<Facility />} />
          <Route path="/branch/facility/locker" element={<Locker />} />
          <Route path="/branch/facility/common" element={<CommonFacility />} />
          <Route path="/branch/staff" element={<Staff />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointment />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
