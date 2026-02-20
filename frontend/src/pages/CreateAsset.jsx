import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { Upload } from 'lucide-react';
import API_BASE_URL from '../utils/api';

const CreateAsset = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [visibility, setVisibility] = useState('public');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('visibility', visibility);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/assets/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        navigate('/my-assets');
      } else {
        setError(data.message || 'Failed to upload asset');
      }
    } catch (error) {
      console.error('Error uploading asset:', error);
      setError('An error occurred during upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <main className="main-content">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1>Create New Asset</h1>
          <p>Upload your image or video to the community.</p>

          <form onSubmit={handleSubmit} className="settings-section" style={{ marginTop: '2rem' }}>
            <div 
              className={`setting-item ${isDragging ? 'dragging' : ''}`} 
              style={{ 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                border: '2px dashed black',
                borderRadius: '8px',
                padding: '2rem',
                backgroundColor: isDragging ? '#f0f0f0' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input 
                id="fileInput"
                type="file" 
                onChange={handleFileChange} 
                accept="image/*,video/*"
                style={{ display: 'none' }}
              />
              <Upload size={48} style={{ marginBottom: '1rem' }} />
              <p style={{ fontWeight: 'bold' }}>{file ? file.name : "DRAG AND DROP OR CLICK TO UPLOAD"}</p>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>Images and Videos supported</p>
            </div>

            <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label>Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Name your masterpiece"
                required 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid black' }}
              />
            </div>

            <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label>Description</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Tell us about it..."
                required 
                style={{ width: '100%', padding: '0.5rem', border: '1px solid black', minHeight: '100px' }}
              />
            </div>

            <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <label>Visibility</label>
              <select 
                value={visibility} 
                onChange={(e) => setVisibility(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid black' }}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

            <Button 
              type="submit" 
              style={{ width: '100%', marginTop: '2rem' }} 
              isLoading={loading}
              disabled={!file}
            >
              <Upload size={18} /> UPLOAD ASSET
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateAsset;
