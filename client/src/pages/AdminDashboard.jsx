import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchBlogs();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data.blogs);
    } catch (err) {
      console.log(err);
    }
  };

  // Change Role
  const changeRole = async (id, role) => {
    try {
      await API.put(`/users/${id}/role`, { role });

      fetchUsers();

      alert("Role Updated Successfully");

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  // Approve Blog
  const approveBlog = async (id) => {
    try {
      await API.put(`/blogs/${id}/approve`);

      fetchBlogs();

    } catch (err) {
      console.log(err);
    }
  };

  // Reject Blog
  const rejectBlog = async (id) => {
    try {
      await API.put(`/blogs/${id}/reject`);

      fetchBlogs();

    } catch (err) {
      console.log(err);
    }
  };

  // Delete Blog
  const deleteBlog = async (id) => {

    if (!window.confirm("Delete this blog?")) return;

    try {

      await API.delete(`/blogs/${id}`);

      fetchBlogs();

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Admin Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h5>Total Users</h5>
            <h2>{users.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h5>Total Blogs</h5>
            <h2>{blogs.length}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h5>Pending Blogs</h5>
            <h2>
              {
                blogs.filter(
                  blog => blog.status === "Pending"
                ).length
              }
            </h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-3">
            <h5>Approved Blogs</h5>
            <h2>
              {
                blogs.filter(
                  blog => blog.status === "Approved"
                ).length
              }
            </h2>
          </div>
        </div>

      </div>

      <hr />

      <h3>Users</h3>

      <table className="table table-bordered">

        <thead>

          <tr>

            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user._id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>

                <select
                  value={user.role}
                  onChange={(e) =>
                    changeRole(user._id, e.target.value)
                  }
                >

                  <option>Reader</option>
                  <option>Author</option>
                  <option>Admin</option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <hr />

      <h3>Blogs</h3>

      <table className="table table-bordered">

        <thead>

          <tr>

            <th>Title</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Reject</th>
            <th>Delete</th>

          </tr>

        </thead>

        <tbody>

          {blogs.map((blog) => (

            <tr key={blog._id}>

              <td>{blog.title}</td>

              <td>{blog.status}</td>

              <td>

                <button
                  className="btn btn-success btn-sm"
                  onClick={() => approveBlog(blog._id)}
                >
                  Approve
                </button>

              </td>

              <td>

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => rejectBlog(blog._id)}
                >
                  Reject
                </button>

              </td>

              <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteBlog(blog._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;