import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ReaderDashboard() {
  const [blogs, setBlogs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data.blogs);
    } catch (err) {
      console.log(err);
    }
  };

  const likeBlog = async (id) => {
    try {
      await API.put(`/blogs/${id}/like`);

      fetchBlogs();

    } catch (err) {
      alert(err.response?.data?.message || "Unable to like blog");
    }
  };

  const unlikeBlog = async (id) => {
    try {
     await API.put(`/blogs/${id}/unlike`);

      fetchBlogs();

    } catch (err) {
      alert(err.response?.data?.message || "Unable to unlike blog");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Reader Dashboard
      </h2>

      <div className="row">

        {blogs.map((blog) => (

          <div
            className="col-md-6 mb-4"
            key={blog._id}
          >

            <div className="card shadow">

              <div className="card-body">

                <h4>{blog.title}</h4>
<p>
  <strong>Author:</strong> {blog.author?.name}
</p>
                <p>
                  <strong>Category:</strong> {blog.category}
                </p>

                <p>
                  {blog.content.substring(0, 150)}...
                </p>

                <p>
                  <strong>Status:</strong> {blog.status}
                </p>

                <p>
                  ❤️ {blog.likes?.length || 0} Likes
                </p>

                <button
                  className="btn btn-success me-2"
                  onClick={() => likeBlog(blog._id)}
                >
                  Like
                </button>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => unlikeBlog(blog._id)}
                >
                  Unlike
                </button>

                <Link
                  to={`/blog/${blog._id}`}
                  className="btn btn-primary"
                >
                  Read More
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ReaderDashboard;