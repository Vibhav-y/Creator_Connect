import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { Loader2, Trash2 } from 'lucide-react';
import API_BASE_URL from '../utils/api';

const MyAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAssets = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/assets/getMyAsset?page=1&limit=100`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setAssets(data.assets);
        }
      } catch (error) {
        console.error('Error fetching my assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAssets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/assets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setAssets(assets.filter(a => a._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>My Assets</h1>
            <p>Manage your uploaded creations.</p>
          </div>
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 className="animate-spin" size={48} />
          </div>
        ) : (
          <>
            {assets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <h3>No assets yet</h3>
                    <p>Start by creating your first asset.</p>
                </div>
            ) : (
                <div className="card-grid">
                  {assets.map((asset) => (
                    <div key={asset._id} className="info-card">
                      <div style={{ height: '200px', backgroundColor: '#f0f0f0', marginBottom: '1rem', overflow: 'hidden', position: 'relative' }}>
                        {asset.type === 'image' ? (
                          <img src={asset.url} alt={asset.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <video src={asset.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                        )}
                        <span style={{ 
                            position: 'absolute', 
                            top: '10px', 
                            right: '10px', 
                            backgroundColor: 'white', 
                            padding: '2px 8px', 
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            border: '1px solid black'
                        }}>
                            {asset.visibility.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h3>{asset.title}</h3>
                            <p style={{ marginTop: '0.5rem' }}>{asset.description}</p>
                        </div>
                        <Button variant="danger" onClick={() => handleDelete(asset._id)} style={{ padding: '0.4rem' }}>
                            <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MyAssets;
