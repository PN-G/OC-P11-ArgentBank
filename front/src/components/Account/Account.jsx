import PropTypes from "prop-types";
import Button from "../Button/Button";

const Account = ({ title, amount, description, buttonText }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">$ {amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Button buttonStyle="transaction-button" text={buttonText} />
      </div>
    </section>
  );
};

Account.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  description: PropTypes.string,
  buttonText: PropTypes.string,
};

export default Account;
