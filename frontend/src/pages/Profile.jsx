import React from 'react';
import Sidebar from '../components/Sidebar';
import UserCard from '../components/UserCard';

const Profile = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h1>User Profile</h1>
        <UserCard />
      </main>
    </div>
  );
};

export default Profile;
