
import React, { useState, useEffect } from "react";
import axios from "axios";

import NoteCard from "./Notecard";
import SearchBar from "./searchbar";
import RecordingBar from "./Recordingbar";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/notes")
      .then((response) => setNotes(response.data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  const handleNewNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);  // Add new note to the list
  };
  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId)); // Update state
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };
  const getFirstThreeWords = (content) => {
    return content.split(' ').slice(0, 3).join(' ');
  };
  const getRemainingContent = (content) => {
    return content.split(' ').slice(3).join(' ');
  };

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <div className="flex">
      
        
        <div className="flex-1 p-6">
          
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="mt-6 pl-1 grid grid-cols-3 h-[509px] overflow-y-auto gap-8">
         
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                noteId={note._id}
                type={note.type}     
                content={getRemainingContent(note.content)}
                title={getFirstThreeWords(note.content)}
                time={new Date(note.time).toLocaleString()}
                audioUrl={note.audioUrl ? `data:audio/wav;base64,${note.audioUrl}` : ""}
                imageUrl={note.imageUrl || ""} 
                onDelete={() => handleDeleteNote(note._id)} 
                onUpdate={handleUpdateNote}
                
              />
            ))}
          </div>
       
        
        <RecordingBar onNewNote={handleNewNote} />
        
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
