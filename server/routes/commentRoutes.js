const express = require("express");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  addComment,
  getComments,
  deleteComment
} = require("../controllers/commentController");

// Add Comment
router.post("/:blogId", protect, addComment);

// Get All Comments
router.get("/:blogId", getComments);
router.delete("/:commentId", protect, deleteComment);

module.exports = router;