import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import BlogCard from "../components/BlogCard";

function AuthorDashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs/myblogs");
      setBlogs(res.data.blogs);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const submitBlog = async (id) => {
    try {
      await API.put(`/blogs/${id}/submit`);
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Author Dashboard</h2>

        <Link
          className="btn btn-success"
          to="/create-blog"
        >
          + Create Blog
        </Link>

      </div>

      {blogs.length === 0 ? (
        <h5>No blogs found.</h5>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onDelete={deleteBlog}
            onSubmit={submitBlog}
            showAuthorActions={true}
          />
        ))
      )}

    </div>
  );
}

export default AuthorDashboard;