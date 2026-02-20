import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { Loader2 } from 'lucide-react';

const ExploreAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/assets/getPublicasset?page=1&limit=100`);
        const data = await response.json();
        if (data.success) {
          setAssets(data.assets);
        }
      } catch (error) {
        console.error('Error fetching assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <header style={{ marginBottom: '2rem' }}>
          <h1>Explore Assets</h1>
          <p>Discover amazing creations from our community.</p>
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader2 className="animate-spin" size={48} />
          </div>
        ) : (
          <div className="card-grid">
            {assets.map((asset) => (
              <div key={asset._id} className="info-card">
                <div style={{ height: '200px', backgroundColor: '#f0f0f0', marginBottom: '1rem', overflow: 'hidden' }}>
                  {asset.type === 'image' ? (
                    <img src={asset.url} alt={asset.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <video src={asset.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                  )}
                </div>
                <h3>{asset.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>By {asset.owner?.name || 'Unknown'}</p>
                <p style={{ marginTop: '0.5rem' }}>{asset.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExploreAssets;
