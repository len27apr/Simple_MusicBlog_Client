import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  // const PF = 'http://localhost:8000/';

  return (
    <div className="post">
      {post.photo &&
        <Link className="link" to={`/post/${post._id}`}>
          <img
            className="postImg"
            src={process.env.REACT_APP_BACKEND_IMAGE_URL + post.photo}
            alt=""
          />
        </Link>}
      <div className="postInfo">
        <Link className="link" to={`/post/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}
