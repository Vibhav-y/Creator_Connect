import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const Settings = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <h1>Settings</h1>
        <div className="settings-section">
          <h3>Preferences</h3>
          <div className="setting-item">
            <label>Dark Mode</label>
            <input type="checkbox" checked readOnly />
          </div>
          <div className="setting-item">
            <label>Email Notifications</label>
            <input type="checkbox" checked readOnly />
          </div>
        </div>
        <div className="settings-section">
          <h3>Security</h3>
          <Button variant="secondary" style={{ marginRight: '1rem' }}>Change Password</Button>
          <Button variant="danger">Delete Account</Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
