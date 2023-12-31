import { Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import PrivateRoutes from "./components/PrivateRoutes";
import Header from "./components/Header";
function App() {
  return (
    <div className="bg-bgColor min-h-screen">
      <Header />
      <div>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
