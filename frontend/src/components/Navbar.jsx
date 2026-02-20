import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Navbar = () => {
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();

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
      <div className="navbar-user">
        {/* Theme Toggle Button */}
        <Button 
          onClick={toggleTheme} 
          className="logout-btn" 
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          style={{ marginRight: '1rem' }}
          variant="secondary"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </Button>

        {user && (
          <>
            <img src={user.avatar} alt={user.name} className="nav-avatar" />
            <span className="nav-username">{user.name}</span>
            <Button onClick={logout} className="logout-btn" title="Logout" variant="secondary">
              <LogOut size={18} />
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
