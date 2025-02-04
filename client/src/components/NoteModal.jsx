import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faDownload, faTimes ,faStickyNote, faMicrophone, faCopy, faCheck, faStar,faUpRightAndDownLeftFromCenter} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../utils/helper";
import ReadMoreModal from "./ReadmoreModal";

const NoteModal = ({ isOpen, onClose, title, content, time, audioUrl, imageUrl, type, noteId, onUpdate,onImageAdd }) => {
  const [activeTab, setActiveTab] = useState("transcript");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [noteContent, setNoteContent] = useState(content);
  const [images, setImages] = useState([]); 
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const handleEnlarge = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleUpdate = (updatedNote) => {
    setNoteContent(updatedNote.content);
    onUpdate(updatedNote);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  const handleFavoriteToggle = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    if (isFavorited) {
      // Remove note from favorites
      favorites = favorites.filter((note) => note.noteId !== noteId);
    } else {
      // Add note to favorites
      favorites.push({ noteId, title, content, time, audioUrl, imageUrl, type });
    }
  
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };
  
  // On component mount, check if the note is already favorited
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorited = favorites.some((note) => note.noteId === noteId);
    setIsFavorited(isAlreadyFavorited);
  }, [noteId]);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setImages(prevImages => {
        const updatedImages = [...prevImages, imageUrl];
        // Save images specific to the noteId in localStorage
        const savedImages = JSON.parse(localStorage.getItem(`images_${noteId}`)) || [];
        savedImages.push(imageUrl);
        localStorage.setItem(`images_${noteId}`, JSON.stringify(savedImages)); 
        return updatedImages;
      });
      onImageAdd();
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    // Delete image specific to the noteId from localStorage
    const savedImages = JSON.parse(localStorage.getItem(`images_${noteId}`)) || [];
    savedImages.splice(index, 1); 
    localStorage.setItem(`images_${noteId}`, JSON.stringify(savedImages)); 
  };

  useEffect(() => {
    // Load images from localStorage based on noteId
    const savedImages = JSON.parse(localStorage.getItem(`images_${noteId}`)) || [];
    setImages(savedImages);
  }, [noteId]);

  useEffect(() => {
    setActiveTab(type === "audio" ? "transcript" : "notes");
  }, [type]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressBarChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, []);


  const imagesToDisplay = images.length > 0 ? images : imageUrl ? [imageUrl] : [];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`bg-white rounded-2xl shadow-lg ${isFullScreen ? "w-full h-full p-6" : "w-full max-w-2xl p-6"} relative`}>
        <div className="flex justify-between">
      <button className="text-gray-500 hover:text-gray-800 rounded-full px-3 py-2 border" onClick={handleEnlarge}>
  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} size="sm" />
</button>
        <div>
        <button
          onClick={handleFavoriteToggle}
          className={`mr-4 text-gray-500 ${isFavorited ? 'text-yellow-500' : 'hover:text-gray-800'}`}
        >
          <FontAwesomeIcon icon={faStar} size="lg" />  {/* Updated to use faStar */}
        </button>
        <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        </div>
        </div>
        <h2 className="text-xl font-semibold mt-3">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{formatDate(time)}</p>

        {type === "audio" ? (
          <div className="mt-4 flex items-center gap-3">
            <button className="text-blue-600" onClick={handlePlayPause}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" />
            </button>
            <input
              type="range"
              className="w-full h-1 bg-gray-300 rounded-lg cursor-pointer"
              value={currentTime}
              max={duration}
              onChange={handleProgressBarChange}
            />
            <span className="text-gray-500 text-sm">0:00/0:09</span>
            <button className="text-gray-500 hover:text-gray-800">
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        ) : (
          <div className="flex-grow"></div>
        )}

        <div className="mt-4 flex border-b">
          {[{ id: "notes", label: "Notes", icon: faStickyNote }, { id: "transcript", label: "Transcript", icon: faMicrophone }].map(({ id, label, icon }) => (
            <button
              key={id}
              className={`flex items-center gap-2 px-4 py-2 text-sm capitalize ${activeTab === id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab(id)}
            >
              <FontAwesomeIcon icon={icon} />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "transcript" && (
            <div className={`bg-gray-100 p-4 rounded-lg transition-all duration-300 ${isFullScreen ? 'h-[350px]' : 'h-[180px]'}`}>
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-2">Transcript</h1>
                <button onClick={handleCopy} className="block text-gray-500 text-sm hover:text-black mb-3">
                  <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} className="mr-2" /> Copy
                </button>
              </div>
              <p className={isFullScreen ? "fullscreen" : "truncated"}>{type === "audio" ? content || "No transcript added." : "Transcript not available."}</p>
              <p className="mt-3 text-gray-600 underline text-sm cursor-pointer" onClick={() => setIsReadMoreOpen(true)}>
                Read more
              </p>
            </div>
          )}
          {activeTab === "notes" && (
             <div className={`bg-gray-100 p-4 rounded-lg transition-all duration-300 ${isFullScreen ? 'h-[350px]' : 'h-[180px]'}`}>
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-2">Notes</h1>
                <button onClick={handleCopy} className="block text-gray-500 text-sm hover:text-black mb-3">
                  <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} className="mr-2" /> Copy
                </button>
              </div>
              <p className={isFullScreen ? "fullscreen" : "truncated"}>{type === "text" || type === "image" ? content || "No notes added." : "Notes not available."}</p>
              <p className="mt-3 text-gray-600 underline text-sm cursor-pointer" onClick={() => setIsReadMoreOpen(true)}>
                Read more
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 h-[100px] justify-start">
        {imagesToDisplay.map((img, index) => (
            <div key={index} className="relative">
              <img src={img} alt="Uploaded" className="w-16 h-16 rounded-lg border" />
              <button onClick={() => handleDeleteImage(index)} className="absolute top-0 right-0 text-red-500 hover:text-red-800">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
        
          ))}
          <label className="flex flex-col items-center justify-center w-16 h-16 border rounded-lg cursor-pointer hover:bg-gray-200">
            <p className="text-[20px] text-gray-600">+</p>
            <input type="file" className="hidden" onChange={handleImageChange} />
            <p className="text-[12px] text-gray-600">image</p>
          </label>
        </div>

        <audio ref={audioRef} src={audioUrl} preload="auto" />
        <ReadMoreModal isOpen={isReadMoreOpen} onClose={() => setIsReadMoreOpen(false)} fullContent={noteContent} noteId={noteId} onUpdate={handleUpdate} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default NoteModal;

