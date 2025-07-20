import { useParams } from "react-router";
import { usePostContext } from "../context/PostsContext";

function PostPage() {
    const {id}=useParams();
    const {posts}=usePostContext();
    const post=posts.find((post)=>post.id===parseInt(id));
    if (!post) {
        return <div>Post not found</div>;
    }
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <img src={post.img} alt={post.title} className="w-full rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
    </div>
  )
}

export default PostPage
