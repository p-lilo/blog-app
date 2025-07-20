// src/pages/MyPosts.jsx
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import { getUserPosts } from "../services/postService";

const UserPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUserPosts(user.uid).then(setPosts);
    }
  }, [user]);

  return (
    <div className="flex flex-wrap justify-center">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          img={post.img}
          content={post.content}
        />
      ))}
    </div>
  );
};

export default UserPosts;
