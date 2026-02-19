import React from 'react';
import { LayoutDashboard, Users, Mail, Bell } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-group">
        <h3>Dashboard</h3>
        <ul>
          <li className="active"><LayoutDashboard size={18} /> Overview</li>
          <li><Users size={18} /> Community</li>
        </ul>
      </div>
      <div className="sidebar-group">
        <h3>Account</h3>
        <ul>
          <li><Mail size={18} /> Messages</li>
          <li><Bell size={18} /> Notifications</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
