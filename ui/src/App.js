import {
    BrowserRouter, Routes,
    Route, Navigate
  } from "react-router-dom";
  import { useContext } from "react";
  import { AuthContext } from "./authContext";
  import AdminLanding from "./pages/AdminLanding";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Landing from "./pages/Landing";
  import Home from "./pages/Home";
  import Restaurant from "./pages/Restaurant";
  import Reservations from "./pages/Reservations";
  
  function App() {
    const { user } = useContext(AuthContext);
  
    const ProtectedRoute = ({ children, redirectTo }) => {
      if (!user || user.isAdmin) {
        return <Navigate to={redirectTo} />;
      } else {
        return children;
      }
    };
  
    const AdminProtectedRoute = ({ children, redirectTo }) => {
      if (!user || !user.isAdmin) {
        return <Navigate to={redirectTo} />;
      } else {
        return children;
      }
    };
  
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<ProtectedRoute redirectTo="/landing"><Landing /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute redirectTo="/landing"><Landing /></ProtectedRoute>} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/admin/restaurant/:id" element={<Restaurant/>} />
          <Route path="/admin/reservations" element={<AdminProtectedRoute redirectTo="/adminLogin"><Reservations type="admin"/></AdminProtectedRoute>} />
          <Route path="/user/reservations" element={<ProtectedRoute redirectTo="/userLogin"><Reservations type="user"/></ProtectedRoute>} />
          <Route path="/adminRegister" element={<Register type="admin" />} />
          <Route path="/adminLogin" element={<Login type="admin" />} />
          <Route path="/userRegister" element={<Register type="user" />} />
          <Route path="/userLogin" element={<Login type="user" />} />
          <Route path="/user/home" element={<Home type="user" />} />
          <Route path="/admin/dashboard" element={<AdminProtectedRoute redirectTo="/adminLogin"><AdminLanding /></AdminProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;
  