import { Link } from 'react-router-dom'; //
import '../components-style/Navigation.css';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Control">Control</Link></li>
        <li><Link to="/Data">Data</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;