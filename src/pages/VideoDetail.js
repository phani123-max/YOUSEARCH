import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const fallbackVideos = [
  { id: '1', title: 'Full Stack Web Development Course 2024', videoUrl: 'https://www.youtube.com/embed/nu_pCVPKzTk' },
  { id: '2', title: 'Node.js & Express.js Full Course', videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE' },
  { id: '3', title: 'React.js Full Course for Beginners', videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8' },
  { id: '4', title: 'MongoDB Crash Course for Beginners', videoUrl: 'https://www.youtube.com/embed/ofme2o290GE' },
  { id: '5', title: 'Python for Beginners - Full Course', videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc' },
  { id: '6', title: 'REST API Design Best Practices', videoUrl: 'https://www.youtube.com/embed/-MTSQjw5DrM' },
  { id: '7', title: 'Learn CSS Grid & Flexbox in 20 Minutes', videoUrl: 'https://www.youtube.com/embed/rg7Fvvl3taU' },
  { id: '8', title: 'Figma UI Design Tutorial for Beginners', videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU' },
  { id: '9', title: 'Docker Tutorial for Beginners', videoUrl: 'https://www.youtube.com/embed/pTFZFxd4hOI' },
  { id: '10', title: 'Git and GitHub Tutorial for Beginners', videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk' },
  { id: '11', title: 'JavaScript DOM Manipulation Course', videoUrl: 'https://www.youtube.com/embed/5fb2aPlgoys' },
  { id: '12', title: 'Kubernetes Course - Full Beginners Tutorial', videoUrl: 'https://www.youtube.com/embed/X48VuDVv0do' }
];

function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [inputNote, setInputNote] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/videos/${id}`)
      .then((res) => setVideo(res.data))
      .catch(() => {
        const found = fallbackVideos.find((v) => v.id === id);
        setVideo(found);
      });
      
    const saved = JSON.parse(localStorage.getItem(`notes_${id}`)) || [];
    setNotes(saved);
  }, [id]);

  const handleSaveNote = () => {
    if (!inputNote.trim()) return;
    const updated = [...notes, inputNote];
    setNotes(updated);
    localStorage.setItem(`notes_${id}`, JSON.stringify(updated));
    setInputNote('');
  };

  if (!video) return <div className="loading" style={{ padding: '40px', textAlign: 'center' }}>Loading video...</div>;

  return (
    <div className="video-page-container">
      <button onClick={() => navigate('/')} className="back-btn">← Back to Courses</button>
      <h2>{video.title}</h2>
      
      <iframe
        width="100%"
        height="480"
        src={video.videoUrl}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="main-player"
      ></iframe>
      
      <div className="notes-box">
        <h3>Lesson Notes</h3>
        <div className="note-input-row">
          <input
            type="text"
            placeholder="Write a key takeaway..."
            value={inputNote}
            onChange={(e) => setInputNote(e.target.value)}
          />
          <button onClick={handleSaveNote}>Add Note</button>
        </div>
        <ul>
          {notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VideoDetail;