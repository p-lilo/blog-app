// src/context/PostsContext.jsx
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebase";

const db = firebase.db;

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get posts from Firebase
  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"));
    const postList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postList);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // delete post
  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("فشل حذف البوست:", error);
    }
  };

  // add post
  const addPost = async (newPost) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), newPost);
      setPosts((prev) => [...prev, { id: docRef.id, ...newPost }]);
    } catch (error) {
      console.error("فشل إضافة البوست:", error);
    }
  };
  //edit
  const updatePost = async (id, updatedData) => {
  try {
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, updatedData);
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updatedData } : post))
    );
  } catch (error) {
    console.error("faild to edit post", error);
  }
};

  return (
    <PostContext.Provider value={{ posts, loading, deletePost, addPost, fetchPosts,setPosts,updatePost }}>
      {children}
    </PostContext.Provider>
  );
};
