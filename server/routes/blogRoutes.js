const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  submitBlog,
  approveBlog,
  rejectBlog,
  likeBlog,
  unlikeBlog,
} = require("../controllers/blogController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// ==========================
// Public Routes
// ==========================

// View approved blogs
router.get("/", getAllBlogs);

// View single blog
router.get("/:id", getBlogById);

// ==========================
// Protected Routes
// ==========================

// Author's own blogs
router.get(
  "/myblogs",
  protect,
  authorize("Author", "Admin"),
  getMyBlogs
);

// Create Blog
router.post(
  "/",
  protect,
  authorize("Author", "Admin"),
  createBlog
);

// Update Blog
router.put(
  "/:id",
  protect,
  authorize("Author", "Admin"),
  updateBlog
);

// Delete Blog
router.delete(
  "/:id",
  protect,
  authorize("Author", "Admin"),
  deleteBlog
);

// Submit Blog
router.put(
  "/:id/submit",
  protect,
  authorize("Author"),
  submitBlog
);

// Approve Blog
router.put(
  "/:id/approve",
  protect,
  authorize("Admin"),
  approveBlog
);

// Reject Blog
router.put(
  "/:id/reject",
  protect,
  authorize("Admin"),
  rejectBlog
);

// Like Blog
router.put(
  "/:id/like",
  protect,
  authorize("Reader", "Author", "Admin"),
  likeBlog
);

// Unlike Blog
router.put(
  "/:id/unlike",
  protect,
  authorize("Reader", "Author", "Admin"),
  unlikeBlog
);

module.exports = router;