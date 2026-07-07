import { Link } from "react-router-dom";

function BlogCard({
  blog,
  onDelete,
  onSubmit,
  showAuthorActions = false,
}) {
  return (
    <div className="card mb-3 shadow-sm">

      <div className="card-body">

        <h4>{blog.title}</h4>

        <p>
          <strong>Category:</strong> {blog.category}
        </p>

        <p>{blog.content}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="badge bg-secondary">
            {blog.status}
          </span>
        </p>

        <Link
          to={`/blog/${blog._id}`}
          className="btn btn-primary me-2"
        >
          Read More
        </Link>

        {showAuthorActions && (
          <>
            <Link
              to={`/edit-blog/${blog._id}`}
              className="btn btn-warning me-2"
            >
              Edit
            </Link>

            <button
              className="btn btn-danger me-2"
              onClick={() => onDelete(blog._id)}
            >
              Delete
            </button>

            {blog.status === "Draft" && (
              <button
                className="btn btn-success"
                onClick={() => onSubmit(blog._id)}
              >
                Submit
              </button>
            )}
          </>
        )}

      </div>

    </div>
  );
}

export default BlogCard;