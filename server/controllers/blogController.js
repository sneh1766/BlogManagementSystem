const Blog = require("../models/Blog");

// ==========================
// Create Blog
// ==========================
exports.createBlog = async (req, res) => {
  try {

    const { title, content, category } = req.body;

    const blog = await Blog.create({
      title,
      content,
      category,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// ==========================
// Get All Blogs
// ==========================
exports.getAllBlogs = async (req, res) => {
  try {

    let blogs;

    if (req.user && req.user.role === "Admin") {

      blogs = await Blog.find()
        .populate("author", "name email")
        .sort({ createdAt: -1 });

    } else {

      blogs = await Blog.find({
        status: "Approved",
      })
        .populate("author", "name email")
        .sort({ createdAt: -1 });

    }

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// ==========================
// Get Logged-in Author Blogs
// ==========================
exports.getMyBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find({
      author: req.user.id,
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// Get Blog By ID
// ==========================
exports.getBlogById = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// Update Blog
// ==========================
exports.updateBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Author can edit only their own blog
    if (
      req.user.role !== "Admin" &&
      blog.author.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this blog",
      });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Delete Blog
// ==========================
exports.deleteBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (
      req.user.role !== "Admin" &&
      blog.author.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this blog",
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// Submit Blog For Approval
// ==========================
exports.submitBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Only Draft blogs can be submitted
    if (blog.status !== "Draft") {
      return res.status(400).json({
        success: false,
        message: "Only Draft blogs can be submitted",
      });
    }

    blog.status = "Pending";

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog submitted for approval successfully",
      blog,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ==========================
// Like Blog
// ==========================
exports.likeBlog = async (req, res) => {

  try {

   const userId = req.user.id;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Blog already liked",
      });
    }

    blog.likes.push(userId);

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog liked successfully",
      likes: blog.likes.length,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// ==========================
// Unlike Blog
// ==========================
exports.unlikeBlog = async (req, res) => {

  try {

    const userId = req.user.id;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.likes = blog.likes.filter(
      (id) => id.toString() !== userId
    );

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog unliked successfully",
      likes: blog.likes.length,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// ==========================
// Approve Blog
// ==========================
exports.approveBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.status = "Approved";
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog approved successfully",
      blog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Reject Blog
// ==========================
exports.rejectBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.status = "Rejected";
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog rejected successfully",
      blog,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};