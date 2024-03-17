import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import User from "./pages/User/User";

const Routing = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/user" element={<User />}/>
            <Route path="*" element={<Home />}/>   
        </Routes>
        </BrowserRouter>
    );
};

export default Routing;