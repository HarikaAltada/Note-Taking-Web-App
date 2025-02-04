
const express = require("express");
const multer = require("multer");
const router = express.Router();


const Note = require("../model/note");

// Create a new note
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Regular expression to strip all HTML tags
const stripHtmlTags = (content) => {
  return content.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
};


router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { content, type } = req.body;
    let audioUrl = null;
    let imageUrl = null;

    if (req.file) {
      if (type === "audio") {
        audioUrl = req.file.buffer.toString("base64");
      } else if (type === "image") {
        imageUrl = `data:image/png;base64,${req.file.buffer.toString("base64")}`;
      }
    }

    const newNote = new Note({ content, type, audioUrl, imageUrl });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { content } = req.body;
    
    // Restrict content tags
    const sanitizedContent = stripHtmlTags(content);

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { content: sanitizedContent },
      { new: true } // Return updated document
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
