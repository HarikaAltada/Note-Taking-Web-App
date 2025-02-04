import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";

const ReadMoreModal = ({ isOpen, onClose, fullContent, noteId, onUpdate ,activeTab}) => {
  const [content, setContent] = useState(fullContent);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/notes/${noteId}`, { content });
      onUpdate(response.data); // Update note in state
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 relative h-[650px]">
        <div className="flex justify-between">

        <h1 className="text-2xl font-bold mb-4">{activeTab === "transcript" ? "Transcript" : "Notes"}</h1>
        {/* Close Button */}
        <div className="mb-2">
          <button 
            className="px-6 py-1 bg-gray-400 text-white rounded-3xl hover:bg-gray-500  transition mr-4"
            onClick={handleSave}
          >
            Save
          </button>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        </div>
        </div>
       
        <ReactQuill
          value={content}
          onChange={setContent}
          className="bg-white h-[500px] w-[850px]"
          theme="snow"
          
        />
        
      </div>
    </div>
  );
};

export default ReadMoreModal;
