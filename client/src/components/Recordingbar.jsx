import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faImage, faPen, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const RecordingBar = ({ onNewNote }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [noteText, setNoteText] = useState("");  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(new Audio());
  
  const [imageFile, setImageFile] = useState(null); // State for storing the image file
  // Speech recognition
 
  const [imageUrl, setImageUrl] = useState("");
  // Speech recognition
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState("");

  const recognition = useRef(null);
 
  
  const imageInputRef = useRef(null); // Reference to the image input

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);  // Set image URL for display
        setImageFile(file);  // Save the file for later upload
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleAddNote = async () => {
    const content = noteText || speechText;

    if (!content && !audioBlob && !imageFile) return;  // Check if there's no content, audio, or image

    const formData = new FormData();
    if (audioBlob) {
      formData.append("file", audioBlob, "recording.wav");
      formData.append("type", "audio");
    } else if (imageFile) {
      formData.append("file", imageFile);
      formData.append("type", "image");
    } else {
      formData.append("type", "text");
    }
    formData.append("content", content);

    try {
      const response = await axios.post("http://localhost:5000/api/notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Note saved:", response.data);
      onNewNote(response.data);  // Update the notes list dynamically
      setAudioBlob(null);
      setAudioUrl("");
      setNoteText("");
      setSpeechText("");  // Reset speech-to-text
      setImageFile(null);  // Reset image file after adding note
      setImageUrl("");     // Reset image URL
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };
  useEffect(() => {
    // Initialize Speech Recognition API
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        const result = event.results[event.resultIndex];
        if (result.isFinal) {
          setSpeechText(result[0].transcript);
        }
      };

      recognition.current.onstart = () => setIsListening(true);
      recognition.current.onend = () => setIsListening(false);
    } else {
      console.error("Speech Recognition is not supported in this browser.");
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setNoteText("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        audioRef.current.src = audioUrl;

        // Automatically save when recording stops
        handleAddNote();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      setTimeout(() => {
        if (mediaRecorderRef.current && isRecording) {
          stopRecording();
        }
      }, 60000); // Stop recording after 60 seconds

    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleToggleRecordingAndSpeech = () => {
    if (isListening) {
      // Stop listening if it's currently active
      handleStopSpeech();
    } else if (isRecording) {
      // Stop recording if it's currently active
      stopRecording();
    } else {
      // Start recording and listening together
      startRecording();
      handleStartSpeech();
    }
  };

 
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNote();
    }
  };

  const handleStartSpeech = () => {
    if (recognition.current) {
      recognition.current.start();
    }
  };

  const handleStopSpeech = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
  };

  return (
    <div className="ml-20 fixed bottom-8 left-1/2 border transform -translate-x-1/2 bg-white shadow-lg rounded-full flex items-center px-4 py-2 w-[750px]">
      <FontAwesomeIcon icon={faPen} className="text-gray-500 mx-2" />
      <FontAwesomeIcon
        icon={faImage}
        className="text-gray-500 mx-2 cursor-pointer"
        onClick={() => imageInputRef.current.click()}  // Trigger file input click
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={imageInputRef}  // Hidden file input element
        onChange={handleImageUpload}  // Handle the image selection
      />
      <input
        type="text"
        placeholder="Type your note or speak..."
        className="flex-grow px-2 py-1 outline-none bg-transparent"
        value={noteText || speechText}
        onChange={(e) => setNoteText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
       {imageUrl && (
        <div className="mx-2">
          <img src={imageUrl} alt="Uploaded" className="w-16 h-16 object-cover rounded-full" />
        </div>
      )}
      {audioUrl && (
        <button className="text-blue-500 mx-2" onClick={() => {
          setIsPlaying(!isPlaying);
          isPlaying ? audioRef.current.pause() : audioRef.current.play();
        }}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      )}

      {/* Unified button for both recording and speech recognition */}
      <button
        className={`text-white ${isRecording || isListening ? "bg-gray-400" : "bg-red-500"} px-4 py-2 rounded-full flex items-center`}
        onClick={handleToggleRecordingAndSpeech}
      >
        <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
        {isRecording || isListening ? "Stop" : "Start Recording"}
      </button>
    </div>
  );
};

export default RecordingBar;