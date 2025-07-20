import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePostContext } from "../context/PostsContext";
import firebase from "../firebase";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary";

const AddPost = () => {
  const { fetchPosts } = usePostContext();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const db = firebase.db;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please fill in both title and content.");
      return;
    }

    setError("");

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    await addDoc(collection(db, "posts"), {
      title,
      content,
      imageUrl,
      userId: user.uid,
      createdAt: new Date(),
    });

    setTitle("");
    setContent("");
    setImage(null);
    fetchPosts();
    navigate("/");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-purple-50 p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Add New Post</h2>

      {error && (
        <div className="text-red-600 text-sm mb-4 text-center bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        ></textarea>

        <label className="text-gray-700 font-medium">
          Upload an image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-2 border border-purple-200 p-2 rounded-lg w-full file:cursor-pointer"
          />
        </label>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
