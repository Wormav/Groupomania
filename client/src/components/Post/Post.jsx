import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import PostCard from "./components/PostCard/PostCard";

export default function Post() {
  const [post, setPost] = useState(null);
  const [addPost, setAddPost] = useState(false);

  const getPost = async () => {
    axios
      .get(`${import.meta.env.VITE_URL}post`, {
        withCredentials: true,
      })
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {post !== null ? (
        <>{post && post.map((p) => <PostCard key={p.id_post} data={p} />)} </>
      ) : (
        <div>non</div>
      )}
    </>
  );
}
