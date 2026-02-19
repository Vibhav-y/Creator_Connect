import React from 'react';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import { useUser } from '../context/UserContext';

const UserCard = () => {
  const { user } = useUser();

  if (!user) return <div className="user-card">No user logged in.</div>;

  return (
    <div className="user-card">
      <div className="user-card-header">
        <img src={user.avatar} alt={user.name} className="user-avatar-large" />
      </div>
      <div className="user-card-body">
        <h2>{user.name}</h2>
        <p className="user-role">{user.role}</p>
        <p className="user-bio">{user.bio}</p>
        
        <div className="user-meta">
          <div className="meta-item">
            <Briefcase size={16} />
            <span>{user.role}</span>
          </div>
          <div className="meta-item">
            <MapPin size={16} />
            <span>{user.location}</span>
          </div>
          <div className="meta-item">
            <Calendar size={16} />
            <span>Joined {user.joinedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
