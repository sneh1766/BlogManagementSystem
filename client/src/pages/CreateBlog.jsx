import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/blogs", formData);

      alert("Blog Created Successfully");

      navigate("/author-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4">

        <h2>Create Blog</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Blog Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <textarea
            rows="8"
            className="form-control mb-3"
            placeholder="Blog Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />

          <button className="btn btn-success">
            Create Blog
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateBlog;