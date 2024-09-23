// Nav that appears on the left hand side of the screen, it contains the links to the different pages of the app

import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Nav() {
  const { user } = useAuth();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {user ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}