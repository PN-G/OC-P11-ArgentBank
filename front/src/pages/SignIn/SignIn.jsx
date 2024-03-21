import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";

const SignIn = () => {
  const loginError = useSelector((state) => state.auth.error);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (loginError === "Network Error") {
      setErrorMessage("Server is not responding, please try again later");
    } else if (loginError) {
      setErrorMessage(
        "Wrong credentials, please check your username and password"
      );
    }
  }, [loginError]);

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <Form />
          {loginError ? (
            <div className="error-message">{errorMessage}</div>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
