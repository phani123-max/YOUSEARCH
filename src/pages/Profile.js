import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Phani',
    email: 'phani@example.com',
    bio: 'Full Stack Web Developer'
  });
  
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('user_profile'));
    if (savedProfile) {
      setUser(savedProfile);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_profile', JSON.stringify(user));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="profile-container" style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', backgroundColor: '#1f2937', borderRadius: '8px', color: '#fff' }}>
      <button 
        onClick={() => navigate('/home')} 
        style={{
          padding: '8px 16px',
          marginBottom: '20px',
          backgroundColor: '#374151',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Courses
      </button>

      <h2>User Profile</h2>
      {saved && <p style={{ color: '#10b981' }}>Profile details updated successfully!</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #374151', backgroundColor: '#111827', color: '#fff' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #374151', backgroundColor: '#111827', color: '#fff' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Bio</label>
          <textarea
            name="bio"
            rows="4"
            value={user.bio}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #374151', backgroundColor: '#111827', color: '#fff' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;