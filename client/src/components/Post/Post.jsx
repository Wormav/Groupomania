import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PostCard from "./components/PostCard/PostCard";
import styles from "./Post.module.scss";
import NewPost from "./components/NewPost/NewPost";

export default function Post() {
  const [post, setPost] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  const userId = useSelector((state) => state.user).id_user;

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
    console.log("pas de boucle");
  }, [updatePost]);

  return (
    <div className={`${styles.container}`}>
      {post !== null ? (
        <>
          <NewPost updatePost={updatePost} setUpdatePost={setUpdatePost} />
          {post &&
            post.map((p) => (
              <PostCard
                key={p.id_post}
                data={p}
                userId={userId}
                updatePost={updatePost}
                setUpdatePost={setUpdatePost}
              />
            ))}{" "}
        </>
      ) : (
        <div>non</div>
      )}
    </div>
  );
}
