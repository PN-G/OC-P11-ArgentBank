import { useDispatch, useSelector } from "react-redux";
import Account from "../../components/Account/Account";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { updateUserName } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const token = useSelector((state) => state.auth.token);
  const userLogged = useSelector((state) => state.auth.isLoggedIn)
  const [editForm, setEditForm] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);
  const navigate = useNavigate()

  useEffect(() => {
    if (!userLogged) {
      navigate("/")
    }
  },[userLogged, navigate] )

  function toggleEditForm() {
    setEditForm(!editForm);
  }

  const changeUserName = (e) => {
    e.preventDefault();
    dispatch(updateUserName({ token, newUserName }));
    setEditForm(false);
  };

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          {editForm ? (
            <form className="edit-form" onSubmit={changeUserName}>
              <h1>Edit user info</h1>
              <div className="edit-form__fields">
                <div className="edit-form__input">
                  <label htmlFor="username">User name : </label>
                  <input
                    autoFocus
                    type="text"
                    id="username"
                    autoComplete="username"
                    defaultValue={userName}
                    onChange={(e) => {
                      setNewUserName(e.target.value);
                    }}
                  />
                </div>
                <div className="edit-form__input">
                  <label htmlFor="firstname">First name : </label>
                  <input
                    disabled
                    type="text"
                    id="firstname"
                    autoComplete="given-name"
                    value={firstName}
                  />
                </div>
                <div className="edit-form__input">
                  <label htmlFor="lastname">Last name : </label>
                  <input
                    disabled
                    type="text"
                    id="lastname"
                    autoComplete="family-name"
                    value={lastName}
                  />
                </div>
              </div>
              <div className="edit-form__buttons">
                <Button buttonStyle="edit-button" text="Save" type="submit" />
                <Button
                  buttonStyle="edit-button"
                  text="Cancel"
                  onClick={toggleEditForm}
                />
              </div>
            </form>
          ) : (
            <div>
              <h1>
                Welcome back
                <br />
                {firstName} {lastName} !
              </h1>
              <Button
                buttonStyle="edit-button"
                text="Edit Name"
                onClick={toggleEditForm}
              />
            </div>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking (x8349)"
          amount={2082.79}
          description="Available Balance"
          buttonText="View transactions"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount={10928.42}
          description="Available Balance"
          buttonText="View transactions"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount={184.3}
          description="Current Balance"
          buttonText="View transactions"
        />
      </main>
      <Footer />
    </div>
  );
};

export default User;
