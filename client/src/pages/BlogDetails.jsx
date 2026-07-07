import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function BlogDetails() {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    fetchBlog();
    fetchComments();

  }, []);

  const fetchBlog = async () => {

    try {

      const res = await API.get(`/blogs/${id}`);

      setBlog(res.data.blog);

    } catch (err) {

      console.log(err);

    }

  };

  const fetchComments = async () => {

    try {

      const res = await API.get(`/comments/${id}`);

      setComments(res.data.comments);

    } catch (err) {

      console.log(err);

    }

  };

  const addComment = async () => {

    try {

      await API.post(`/comments/${id}`, {

    comment: comment,

});

      setComment("");

      fetchComments();

    } catch (err) {

      alert(err.response?.data?.message);

    }

  };

  if (!blog) {

    return <h2 className="text-center mt-5">Loading...</h2>;

  }

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-body">

          <h2>{blog.title}</h2>
          <p>
  <strong>Author:</strong> {blog.author?.name}
</p>

<p>
  <strong>Email:</strong> {blog.author?.email}
</p>

          <p>

            <strong>Category:</strong> {blog.category}

          </p>

          <hr />

          <p>{blog.content}</p>

          <hr />

          <h4>Comments</h4>

          {comments.length === 0 ? (

            <p>No comments yet.</p>

          ) : (

            comments.map((c) => (

  <div
    key={c._id}
    className="border rounded p-3 mb-3"
  >

    <h6 className="text-primary">
      {c.user?.name}
    </h6>

    <p className="mb-0">
      {c.comment}
    </p>

  </div>

))

          )}

          <textarea

            className="form-control mt-3"

            rows="3"

            placeholder="Write your comment..."

            value={comment}

            onChange={(e) => setComment(e.target.value)}

          />

          <button

            className="btn btn-primary mt-3"

            onClick={addComment}

          >

            Add Comment

          </button>

        </div>

      </div>

    </div>

  );

}

export default BlogDetails;