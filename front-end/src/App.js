import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import MangerLogin from "./pages/mangerLogin";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./utils/protectedRoute";
import Shopping from "./pages/shopping";
import Register from "./components/register";
import RegisterPage from "./pages/registerPage";
import AlreadyLoggedIn from "./pages/alreadyLoggedIn";
import ExecutiveManager from "./pages/executiveManager";
import ExecutiveLoginForm from "./components/executiveLoginForm";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  let jwt = localStorage.getItem("token");
  let ejwt = localStorage.getItem("eToken");
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={jwt != null ? <Products /> : <Login />} />
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
          <Route exact path="/branch/manage" element={<ProtectedRoute/>}>
            <Route exact path="/branch/manage" element={<BranchManagement/>}/>
          </Route>
          <Route exact path="/branch/customer" element={<ProtectedRoute/>}>
            <Route exact path="/branch/customer" element={<Customer />}/>
          </Route>
          <Route exact path="/branch/product" element={<ProtectedRoute/>}>
            <Route exact path="/branch/product" element={<Product />}/>
          </Route>
          <Route exact path="/branch/facility" element={<ProtectedRoute/>}>
            <Route exact path="/branch/facility" element={<Facility />}/>
          </Route>
          <Route exact path="/branch/facility/locker" element={<ProtectedRoute/>}>
            <Route exact path="/branch/facility/locker" element={<Locker />}/>
          </Route>
          <Route exact path="/branch/facility/common" element={<ProtectedRoute/>}>
            <Route exact path="/branch/facility/common" element={<CommonFacility />}/>
          </Route>
          <Route exact path="/branch/staff" element={<ProtectedRoute/>}>
            <Route exact path="/branch/staff" element={<Staff />}/>
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
              

        </Routes>
      </div>
    </div>
  );
}

export default App;
