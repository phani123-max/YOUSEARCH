import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Generates an array of exactly 80 video items
const DUMMY_VIDEOS = Array.from({ length: 80 }, (_, index) => {
  const id = index % 2 === 0 ? 'dQw4w9WgXcQ' : '3JZ_D3ELwOQ';
  const categories = ['Trending Music & Shorts', 'Gaming Highlights & Walkthroughs', 'Java & Python Programming Tips', 'Tech News & Updates'];
  const category = categories[index % categories.length];
  
  return {
    id: id,
    title: `Yousearch Video #${index + 1}: ${category}`,
    thumbnailUrl: `https://images.unsplash.com/photo-${1500000000000 + (index * 12345)}?w=500&auto=format&fit=crop&q=60`,
    channelLogo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
    channelName: `Creator ${index + 1}`,
    publishedAt: `${(index % 11) + 1} days ago`
  };
});

function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState(DUMMY_VIDEOS);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearchQuery('');
    setVideos(DUMMY_VIDEOS);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setVideos(DUMMY_VIDEOS);
      return;
    }
    const filtered = DUMMY_VIDEOS.filter(v => 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channelName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setVideos(filtered.length > 0 ? filtered : DUMMY_VIDEOS);
  };

  return (
    <div className="nxt-layout">
      <aside className="nxt-sidebar">
        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activeTab === 'Home' ? 'active' : ''}`}
            onClick={() => handleTabChange('Home')}
          >
            <span className="icon">🔴</span> Home
          </button>
          <button
            className={`menu-item ${activeTab === 'Trending' ? 'active' : ''}`}
            onClick={() => handleTabChange('Trending')}
          >
            <span className="icon">🔥</span> Trending
          </button>
          <button
            className={`menu-item ${activeTab === 'Gaming' ? 'active' : ''}`}
            onClick={() => handleTabChange('Gaming')}
          >
            <span className="icon">🎮</span> Gaming
          </button>
          <Link to="/notes" className="menu-item">
            <span className="icon">📑</span> Saved Videos
          </Link>
        </nav>

        <div className="sidebar-footer">
          <p className="footer-heading">CONTACT US</p>
          <div className="social-icons">
            <span className="social-btn fb">f</span>
            <span className="social-btn tw">t</span>
            <span className="social-btn in">in</span>
          </div>
          <p className="footer-text">Enjoy! Now to see your channels and recommendations!</p>
        </div>
      </aside>

      <main className="nxt-main">
        {showBanner && (
          <div className="promo-banner">
            <div className="banner-content">
              <span className="banner-logo">
                <span className="logo-icon">▶</span> YOUSEARCH
              </span>
              <p>Buy YOUSEARCH Premium prepaid plans with UPI</p>
              <button className="banner-btn">GET IT NOW</button>
            </div>
            <button className="banner-close" onClick={() => setShowBanner(false)}>
              ✕
            </button>
          </div>
        )}

        <div className="search-section">
          <form onSubmit={handleSearchSubmit} className="search-box">
            <input
              type="text"
              placeholder="Search YOUSEARCH videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
        </div>

        <div className="nxt-video-grid">
          {videos.map((video, idx) => (
            <div
              key={`${video.id}-${idx}`}
              className="nxt-video-card"
              onClick={() => setSelectedVideoId(video.id)}
            >
              <div className="thumb-container">
                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60" alt={video.title} className="card-thumb" />
              </div>
              <div className="card-details">
                <img src={video.channelLogo} alt={video.channelName} className="channel-avatar" />
                <div className="card-info">
                  <h4 className="video-title">{video.title}</h4>
                  <p className="channel-title">{video.channelName}</p>
                  <p className="video-meta">{video.publishedAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedVideoId && (
          <div className="video-modal-overlay" onClick={() => setSelectedVideoId(null)}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="video-modal-close" onClick={() => setSelectedVideoId(null)}>
                ✕
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YOUSEARCH Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;