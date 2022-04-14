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
import Shopping from "./pages/shopping";
import Register from "./components/register";
import RegisterPage from "./pages/registerPage";
import AlreadyLoggedIn from "./pages/alreadyLoggedIn";
import ExecutiveManager from "./pages/executiveManager";

function App() {
  let jwt = localStorage.getItem("token");
  return (
    <div>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={jwt != null ? <Products /> : <Login />} />
          <Route
            path="/login"
            element={jwt != null ? <AlreadyLoggedIn /> : <Login />}
          />
          <Route
            path="/orders"
            element={jwt != null ? <Orders /> : <Login />}
          />
          <Route path="/executive" element={<ExecutiveManager />} />
          <Route path="/branch" element={<BranchManagement />} />
          <Route path="/branch/customer" element={<Customer />} />
          <Route path="/branch/product" element={<Product />} />
          <Route path="/branch/facility" element={<Facility />} />
          <Route path="/branch/facility/locker" element={<Locker />} />
          <Route path="/branch/facility/common" element={<CommonFacility />} />
          <Route path="/branch/staff" element={<Staff />} />
          <Route
            path="/fitnessProfiles"
            element={jwt != null ? <Profile /> : <Login />}
          />
          <Route
            path="/appointments"
            element={jwt != null ? <Appointment /> : <Login />}
          />
          <Route path="/shopping" element={<Shopping />} />
          <Route
            path="/register"
            element={jwt != null ? <AlreadyLoggedIn /> : <RegisterPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
