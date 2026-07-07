const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

// ==========================
// Add Comment
// ==========================
exports.addComment = async (req, res) => {
  try {

    const { comment } = req.body;

    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

   const newComment = await Comment.create({
  blog: req.params.blogId,
  user: req.user.id,
  comment,
});

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// Get All Comments
// ==========================
exports.getComments = async (req, res) => {
  try {

    const comments = await Comment.find({
  blog: req.params.blogId,
})
.populate("user", "name email")
.sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// Delete Comment
// ==========================
exports.deleteComment = async (req, res) => {
  try {

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Allow only the owner or Admin
    if (
      req.user.role !== "Admin" &&
      comment.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this comment",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};