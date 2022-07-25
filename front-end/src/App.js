import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/nav";
import Home from "./pages/client/home";
import Products from "./pages/client/browseProducts";
import Login from "./pages/client/login";
import ShoppingCart from "./pages/client/shoppingCart";
import Orders from "./pages/client/orders";
import BranchManagement from "./pages/manager/branchManagement";
import Customer from "./pages/manager/customer";
import Product from "./pages/manager/product";
import Facility from "./pages/manager/facility";
import Staff from "./pages/manager/staff";
import Locker from "./pages/manager/locker";
import CommonFacility from "./pages/manager/commonFacility";
import Profile from "./pages/client/profile";
import ATable from "./components/client/appointment/atable";
import Appointment from "./pages/client/appointments";
import MangerLogin from "./pages/manager/mangerLogin";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./utils/protectedRoute";
import Shopping from "./pages/client/shopping";
import Register from "./components/client/register/register";
import RegisterPage from "./pages/client/registerPage";
import AlreadyLoggedIn from "./pages/client/alreadyLoggedIn";
import ExecutiveManager from "./pages/executive/executiveManager";
import ExecutiveLoginForm from "./components/executive/executiveLoginForm";
import "react-toastify/dist/ReactToastify.css";
import OrderManagement from "./pages/manager/orderManagement";
import AppointmentManagement from "./pages/manager/appointmentManagement";
import Index from "./pages/client";
import Footer from "./components/footer";

function App() {
  let jwt = localStorage.getItem("token");
  let ejwt = localStorage.getItem("eToken");
  const mjwt = localStorage.getItem("");
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/orders"
            element={jwt != null ? <Orders /> : <Login />}
          />
          <Route
            path="/executive"
            element={
              ejwt != null ? <ExecutiveManager /> : <ExecutiveLoginForm />
            }
          />
          <Route path="/branch" element={<MangerLogin />} />
          <Route exact path="/branch/manage" element={<ProtectedRoute />}>
            <Route exact path="/branch/manage" element={<BranchManagement />} />
          </Route>
          <Route exact path="/branch/customer" element={<ProtectedRoute />}>
            <Route exact path="/branch/customer" element={<Customer />} />
          </Route>
          <Route exact path="/branch/product" element={<ProtectedRoute />}>
            <Route exact path="/branch/product" element={<Product />} />
          </Route>
          <Route exact path="/branch/facility" element={<ProtectedRoute />}>
            <Route exact path="/branch/facility" element={<Facility />} />
          </Route>
          <Route
            exact
            path="/branch/facility/locker"
            element={<ProtectedRoute />}
          >
            <Route exact path="/branch/facility/locker" element={<Locker />} />
          </Route>
          <Route
            exact
            path="/branch/facility/common"
            element={<ProtectedRoute />}
          >
            <Route
              exact
              path="/branch/facility/common"
              element={<CommonFacility />}
            />
          </Route>
          <Route exact path="/branch/staff" element={<ProtectedRoute />}>
            <Route exact path="/branch/staff" element={<Staff />} />
          </Route>
          <Route exact path="/branch/order" element={<ProtectedRoute />}>
            <Route exact path="/branch/order" element={<OrderManagement />} />
          </Route>
          <Route exact path="/branch/appointment" element={<ProtectedRoute />}>
            <Route
              exact
              path="/branch/appointment"
              element={<AppointmentManagement />}
            />
          </Route>
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
          <Route path="/not_found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
