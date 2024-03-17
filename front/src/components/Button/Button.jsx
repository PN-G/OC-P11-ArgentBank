import PropTypes from "prop-types";

const Button = ({ text, buttonStyle, onClick, disabled }) => {
  return (
    <button className={buttonStyle} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  buttonStyle: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
