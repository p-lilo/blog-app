import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { usePostContext } from "../context/PostsContext";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost } = usePostContext();
  const [loading, setLoading] = useState(false);
 

  const currentPost = posts.find((post) => post.id === id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");


  if (loading) return <p>Loading....</p>;
  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setContent(currentPost.content);
      setImage(currentPost.imageUrl);
    }
  }, [currentPost]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(file);
      setImage(imageUrl);
    } catch (error) {
      console.error("فشل رفع الصورة:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updatePost(id, {
      title,
      content,
      imageUrl: image,
    });
    navigate("/");
  };

  if (!currentPost) return <p className="text-center mt-10">Post not found..</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md ">
  <button
    onClick={() => navigate(-1)}
    className="text-sm text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-2"
  >
    <FaArrowLeft /> Back
  </button>

  <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Edit Post</h2>

  <form onSubmit={handleUpdate} className="space-y-4">
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title"
      className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
      required
    />

    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Content"
      rows={6}
      className="w-full p-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
      required
    ></textarea>

    <div>
      <label className="block mb-2 font-medium text-gray-700">Image</label>
      {image && <img src={image} alt="Post" className="w-32 h-32 object-cover rounded mb-3" />}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {loading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
    </div>

    <button
      type="submit"
      className="w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition"
    >
      Save Changes
    </button>
  </form>
</div>

  );
};

export default EditPost;
