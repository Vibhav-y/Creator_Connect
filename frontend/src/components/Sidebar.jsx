import { Compass, FolderHeart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-group">
        <h3>Assets</h3>
        <ul>
          <li>
            <NavLink to="/explore" className={({ isActive }) => isActive ? "active" : ""}>
              <Compass size={18} /> Explore Assets
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-assets" className={({ isActive }) => isActive ? "active" : ""}>
              <FolderHeart size={18} /> My Assets
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
