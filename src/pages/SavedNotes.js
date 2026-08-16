import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SavedNotes() {
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const notesArr = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('notes_')) {
        const videoId = key.replace('notes_', '');
        const saved = JSON.parse(localStorage.getItem(key)) || [];
        notesArr.push({ videoId, notes: saved });
      }
    }
    setAllNotes(notesArr);
  }, []);

  return (
    <div className="saved-notes-page" style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', color: '#fff' }}>
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

      <h2>My Saved Notes</h2>

      {allNotes.length === 0 ? (
        <p style={{ color: '#9ca3af' }}>No notes saved yet.</p>
      ) : (
        allNotes.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#1f2937', padding: '15px', borderRadius: '6px', marginBottom: '15px' }}>
            <h3>Lesson ID: {item.videoId}</h3>
            <ul>
              {item.notes.map((note, nIdx) => (
                <li key={nIdx}>{note}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedNotes;