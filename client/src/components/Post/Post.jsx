import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PostCard from "./components/PostCard/PostCard";
import styles from "./Post.module.scss";
import NewPost from "./components/NewPost/NewPost";
import Filter from "./components/Filter/Filter";

export default function Post() {
  const [post, setPost] = useState(null);
  const [postLikes, setPostLikes] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);
  const [filterValue, setFilterValue] = useState(false);
  const [likesData, setLikesData] = useState(null);

  const userId = useSelector((state) => state.user).id_user;

  const getPost = async () => {
    axios
      .get(`${import.meta.env.VITE_URL}post`, {
        withCredentials: true,
      })
      .then((res) => setPost(res.data), setLikesData(null))
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_URL}like/getalllike`, {
        withCredentials: true,
      })
      .then((res) => setLikesData(res.data))
      .catch((err) => console.log(err));

    setPostLikes(null);
  };

  useEffect(() => {
    getPost();
    if (filterValue === true) {
      getPost();
      putPost();
    }
  }, [updatePost, filterValue]);

  const putPost = () => {
    likesData.map((l) => {
      const idPost = l.like_post_id;
      const idUser = l.like_user_id;
      post.map((p) => {
        if (p.arrayLikes === null) {
          p.arrayLikes = [];
        }
        if (idPost === p.id_post) {
          p.arrayLikes.push(idUser);
        }
      });
    });
    setPostLikes(post);
  };

  console.log(postLikes);

  return (
    <div className={`${styles.container}`}>
      {post !== null ? (
        <>
          <NewPost updatePost={updatePost} setUpdatePost={setUpdatePost} />
          <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
          {postLikes
            ? postLikes
                .sort((a, b) => b.arrayLikes.length - a.arrayLikes.length)
                .map((p) => (
                  <PostCard
                    key={p.id_post}
                    data={p}
                    userId={userId}
                    updatePost={updatePost}
                    setUpdatePost={setUpdatePost}
                  />
                ))
            : post.map((p) => (
                <PostCard
                  key={p.id_post}
                  data={p}
                  userId={userId}
                  updatePost={updatePost}
                  setUpdatePost={setUpdatePost}
                />
              ))}
        </>
      ) : null}
    </div>
  );
}
