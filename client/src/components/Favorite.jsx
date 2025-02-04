import React, { useState, useEffect ,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faFileAlt,
  faImage,
  faCopy,
  faCheck,
 
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../utils/helper";

const Favorite = () => {
  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [copiedNoteId, setCopiedNoteId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteNotes(savedFavorites);
  }, []);

  const handlePlayPause = (audioUrl) => {
    if (currentAudioUrl === audioUrl && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentAudioUrl(audioUrl);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  const handleCopy = (noteId, content) => {
    navigator.clipboard.writeText(content);
    setCopiedNoteId(noteId);
    setTimeout(() => {
      setCopiedNoteId(null);
    }, 2000);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl text-gray-500 font-semibold mb-4">Favorite Notes</h2>
      {favoriteNotes.length === 0 ? (
        <p className="flex justify-center items-center mr-40 h-80 text-gray-500">No favorite notes</p>
      ) : (
        <div className="grid grid-cols-3 gap-8 h-[610px] overflow-y-auto">
          {favoriteNotes.map((note) => (           
            <div key={note.id} className="ml-1 bg-white p-4 rounded-lg shadow-md h-[220px]">
              <p className="text-xs text-gray-500">{formatDate(note.time)}</p>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{note.title}</h2>
                {note.type === "audio" && note.audioUrl? (
                  <span className="text-gray-500 flex items-center space-x-1">
                    <button className="text-gray-500" onClick={() => handlePlayPause(note.audioUrl)}
                    >
                    <FontAwesomeIcon icon={isPlaying && currentAudioUrl === note.audioUrl ? faPause : faPlay} />
                    </button>
                    <span>00:09</span>
                  </span>
                ) : (
                  <span className="block text-gray-600">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-1" />
                    Text
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-2 h-[110px] cursor-pointer truncated">
                {note.content}
              </p>

              {/* Image and Options Button Container */}
              <div className="flex justify-between items-center w-full mt-2">
                {note.type === "image" && note.imageUr ? (
                  <div className="flex items-center text-gray-500 flex-grow">
                    <FontAwesomeIcon icon={faImage} />
                    <span className="ml-2">Image</span>
                  </div>
                ) : (
                  <div className="flex-grow"></div>
                )}

                <div className="relative">
                  <div className="flex flex-row">
                    <button
                     onClick={() => handleCopy(note.id, note.content)}
                      className="block text-gray-500 hover:text-black p-1"
                    >
                      <FontAwesomeIcon
                       icon={copiedNoteId === note.id ? faCheck : faCopy}
                        className="mr-2"
                      />
                    </button>
                  
                  </div>
                 
                </div>
              </div>
            </div>
          ))} 
        </div>
      )}
         <audio ref={audioRef} src={currentAudioUrl} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default Favorite;
