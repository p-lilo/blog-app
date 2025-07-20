import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import { usePostContext } from "../context/PostsContext";

function Home() {
  const navigate = useNavigate();
  const { posts, loading } = usePostContext(); 
  const { user } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow justify-center">
      {user && (
        <button
          onClick={() => navigate("/create")}
          className="bg-purple-600 text-white rounded-full mb-6 w-full h-14 text-xl shadow-lg hover:bg-purple-700 transition">
          What's on your mind?
        </button>
      )}
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found yet!</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default Home;
