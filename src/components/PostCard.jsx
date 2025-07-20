import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaCommentAlt, FaEdit, FaHeart, FaShare, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePostContext } from "../context/PostsContext";
import firebase from "../firebase";

const db = firebase.db;

function PostCard({ post }) {
  const { user } = useAuth();
  const { deletePost } = usePostContext();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [postOwner, setPostOwner] = useState(null);

  useEffect(() => {
    const fetchPostOwner = async () => {
      if (!post.userId) return;
      try {
        const userRef = doc(db, "users", post.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setPostOwner(userSnap.data());
        }
      } catch (error) {
        console.error("Error fetching post owner:", error);
      }
    };

    fetchPostOwner();
  }, [post.userId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    await deletePost(id);
  };

  const handleAction = (actionType) => {
    if (!user?.uid) {
      setShowDialog(true);
      return;
    }

    switch (actionType) {
      case "like":
        console.log("Liked post!");
        break;
      case "comment":
        console.log("Comment on post!");
        break;
      case "share":
        console.log("Shared post!");
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden my-6">
      {post.userId === user?.uid && (
        <div className="flex justify-end gap-4 p-4">
          <button
            onClick={() => handleDelete(post.id)}
            title="Delete post"
            className="text-purple-800 hover:text-purple-900 transition"
          >
            <FaTrash size={18} />
          </button>
          <button
            onClick={() => navigate(`/edit/${post.id}`)}
            title="Edit post"
            className="text-purple-500 hover:text-purple-700 transition"
          >
            <FaEdit size={18} />
          </button>
        </div>
      )}

      <h1 className="text-gray-500 mb-2">
        By: {postOwner?.name || "Unknown"}
      </h1>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="post" className="w-full h-64 object-cover" />
      )}

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.content}</p>

        <div className="flex justify-between pt-2 border-t border-gray-200 mt-4 text-sm text-gray-600">
          <button
            onClick={() => handleAction("like")}
            className="flex items-center gap-1 hover:text-red-500 transition"
          >
            <FaHeart /> Like
          </button>

          <button
            onClick={() => handleAction("comment")}
            className="flex items-center gap-1 hover:text-blue-500 transition"
          >
            <FaCommentAlt /> Comment
          </button>

          <button
            onClick={() => handleAction("share")}
            className="flex items-center gap-1 hover:text-green-500 transition"
          >
            <FaShare /> Share
          </button>
        </div>
      </div>

      {showDialog && (
        <dialog open className="modal">
          <div className="modal-box text-center">
            <h3 className="font-bold text-lg mb-4">Sign in</h3>
            <p className="mb-4">Sign in first to like, comment, and share posts.</p>
            <div className="modal-action justify-center">
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
              <button className="btn btn-ghost" onClick={() => setShowDialog(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default PostCard;
