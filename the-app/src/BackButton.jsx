import { Link } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  return (
    <Link to="/" className="back-btn">
      &#8592; Back
    </Link>
  );
}

export default BackButton;