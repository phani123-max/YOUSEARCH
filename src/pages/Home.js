import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = 'AIzaSyA4Yrp5eDKHUIHnbRHmfjWA7iinTyposHU';

const TAB_QUERIES = {
  Home: 'trending videos',
  Trending: 'trending music and news',
  Gaming: 'gaming trailers highlights'
};

function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const fetchYouTubeVideos = async (query, pageToken = '') => {
    if (!API_KEY) return;

    setIsLoading(true);
    try {
      const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&type=video&q=${encodeURIComponent(
        query
      )}&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.items) {
        const formattedVideos = data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
          channelLogo: item.snippet.thumbnails.default?.url,
          channelName: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString()
        }));

        setVideos((prev) => (pageToken ? [...prev, ...formattedVideos] : formattedVideos));
        setNextPageToken(data.nextPageToken || '');
      }
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchYouTubeVideos(TAB_QUERIES.Home);
  }, []);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearchQuery('');
    setNextPageToken('');
    fetchYouTubeVideos(TAB_QUERIES[tabName] || tabName);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setNextPageToken('');
    fetchYouTubeVideos(searchQuery);
  };

  const loadMore = useCallback(() => {
    if (isLoading || !nextPageToken) return;
    const currentQuery = searchQuery.trim() || TAB_QUERIES[activeTab] || 'videos';
    fetchYouTubeVideos(currentQuery, nextPageToken);
  }, [isLoading, nextPageToken, searchQuery, activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

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
                <img src={video.thumbnailUrl} alt={video.title} className="card-thumb" />
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

        {isLoading && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#64748b' }}>
            <p>Loading more videos...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;