import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../slices/authSlice";
import { getUserData, userLogOut } from "../../slices/userSlice";
import { useEffect } from "react";

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token));
    }
  })

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    dispatch(userLogOut());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <NavLink to="/">
        <div className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </div>
      </NavLink>
      {isLoggedIn ? (
        <div className="main-nav-links">
          <NavLink to="/user" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {userName}
          </NavLink>
          <div className="main-nav-item" onClick={handleLogOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </div>
        </div>
      ) : (
        <div>
          <NavLink to="/signin" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Header;
