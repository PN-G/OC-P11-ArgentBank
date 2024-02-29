import PropTypes from 'prop-types'

const Feature = ({ img, title, text }) => {
  return (
    <div className="feature-item">
      <img src={img} alt={img} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

Feature.propTypes = {
    img : PropTypes.string,
    title : PropTypes.string,
    text : PropTypes.string,
};

export default Feature;
