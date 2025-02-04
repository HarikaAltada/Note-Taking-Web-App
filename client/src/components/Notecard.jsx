import React, { useState, useRef,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faFileAlt, faImage, faCopy, faCheck, faTrash, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../utils/helper";
import NoteModal from "./NoteModal";  // Import the NoteModal component

const NoteCard = ({ type, title, content, time, audioUrl, imageUrl,onDelete,noteId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioUrl));
  const [isCopied, setIsCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [note, setNote] = useState({ title, content, imageUrl });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [hasImage, setHasImage] = useState(false); // Track if an image is present
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem(`images_${noteId}`)) || [];
    setHasImage(storedImages.length > 0);
  }, [noteId]);
   // Callback function to update state when an image is added
   const handleImageAdded = () => {
    setHasImage(true);
  };

  useEffect(() => {
    const audio = audioRef.current;

    // Load duration when metadata is available
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Update current time as audio plays
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    // Reset play state when audio ends
    const handleAudioEnd = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Convert time to MM:SS format
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  const handleUpdate = (updatedNote) => {
    setNote((prevNote) => ({
      ...prevNote,
      content: updatedNote.content,
    }));
  };
  const handleDelete = () => {
    // Retrieve favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    // Remove the deleted note from favorites
    favorites = favorites.filter((note) => note.noteId !== noteId);
  
    // Update localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  
    // Remove associated images if any
    localStorage.removeItem(`images_${noteId}`);
  
    // Call the parent delete function
    onDelete();
  };
  

  const openModal = () => {
    setIsModalOpen(true); // Open modal when content is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    
    <div className="bg-white p-4 rounded-lg shadow-md h-[220px]">
      <p className="text-xs text-gray-500">{formatDate(time)}</p>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        {type === "audio"&& audioUrl ? (
          <span className="text-gray-500 flex items-center space-x-1">
            <button className="text-gray-500" onClick={handleTogglePlay}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <span>{formatTime(currentTime)}</span>
          </span>
        ) : (
          <span className="block text-gray-600">
            <FontAwesomeIcon icon={faFileAlt} className="mr-1" />Text
          </span>
        )}
      </div>
     
      <p className="text-sm text-gray-600 h-[110px] mt-2 cursor-pointer truncated" onClick={openModal}
      
      >{note.content}</p> 
     
      {/* Image and Options Button Container */}
      <div className="flex justify-between items-center w-full">
        {type === "image" && imageUrl || hasImage ? (
          <div className="flex items-center text-gray-500 flex-grow mt-1">
            <FontAwesomeIcon icon={faImage} />
            <span className="ml-2">Image</span>
          </div>
        ) : (
          <div className="flex-grow"></div>
        )}

        <div className="relative">
          <div className="flex flex-row">
            <button
              onClick={handleCopy}
              className="block text-gray-500 hover:text-black p-1 w-full text-left"
            >
              <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} className="mr-2" />
            </button>
            <button
              className="text-gray-500 hover:text-black ml-auto"
              onClick={() => setShowOptions(!showOptions)}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
          {showOptions && (
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-32 z-10">
              <button className="block text-gray-500 hover:text-red-500 p-1 w-full text-left" onClick={handleDelete} >
                <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
              </button>
              
            </div>
          )}
        </div>
      </div>

     
      
      {/* Note Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={note.title}
        time={time}
        content={note.content}
        audioUrl={audioUrl}
        type={type}
        noteId={noteId}
        imageUrl={note.imageUrl}
        onUpdate={handleUpdate}
        onImageAdd={handleImageAdded}
      />
    </div>
  );
};

export default NoteCard;




