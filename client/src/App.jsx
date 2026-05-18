import Signup from "./pages/signup";
import Login from "./pages/login";
import { Route , Routes } from "react-router-dom";
import OTPVerification from "./components/OtpComponent";
export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/verify-otp" element={<OTPVerification/>}/>
      </Routes>
      
    </div>
  );
}
