import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Settings, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CREATOR CONNECT</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-item">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <User size={20} />
          <span>Profile</span>
        </Link>
        <Link to="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        {!user && (
          <Link to="/login" className="nav-item">
            <span>Login</span>
          </Link>
        )}
      </div>
      {user && (
        <div className="navbar-user">
          <img src={user.avatar} alt={user.name} className="nav-avatar" />
          <span className="nav-username">{user.name}</span>
          <button onClick={logout} className="logout-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
