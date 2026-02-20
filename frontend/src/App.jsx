import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ExploreAssets from './pages/ExploreAssets';
import MyAssets from './pages/MyAssets';
import CreateAsset from './pages/CreateAsset';
import './App.css';

// Only allows access if the user is logged in
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Redirects logged-in users away from guest-only pages (like Login)
const PublicRoute = ({ children }) => {
  const { user } = useUser();
  if (user) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MainLayout />
      </UserProvider>
    </ThemeProvider>
  );
}

const MainLayout = () => {
  const { loading } = useUser();

  // Show a simple loading state while we check the session
  if (loading) return <div style={{ padding: '2rem' }}>LOADING...</div>;

  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <div className="content-area">
          <Routes>
            {/* Protected Routes */}
            <Route path="/" element={<Navigate to="/explore" replace />} />
            <Route path="/explore" element={<ProtectedRoute><ExploreAssets /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/create-asset" element={<ProtectedRoute><CreateAsset /></ProtectedRoute>} />
            <Route path="/my-assets" element={<ProtectedRoute><MyAssets /></ProtectedRoute>} />
            
            {/* Guest Only Routes */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
