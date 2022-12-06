import React, { useEffect, useState } from "react";
import styles from "./Follow.module.scss";
import axios from "axios";
import BtnFollow from "./BtnFollow/BtnFollow";
import { useSelector } from "react-redux";

export default function Follow(id) {
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [changeInFollow, setChangeInFollow] = useState(false);

  const userId = useSelector((state) => state.user).id_user;

  const getFollowers = async () => {
    axios
      .get(`${import.meta.env.VITE_URL}follow/follower/${id.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const array = [];
        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          let dataFollower = data[i].follow_id_user;
          array.push(dataFollower);
        }
        setFollower(array);
      })
      .catch((err) => console.log(err));
  };

  const getFollowing = async () => {
    axios
      .get(`${import.meta.env.VITE_URL}follow/following/${id.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const array = [];
        const data = res.data;

        for (let i = 0; i < data.length; i++) {
          let dataFollower = data[i].follow_id_follow;
          array.push(dataFollower);
        }
        setFollowing(array);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFollowers();
    getFollowing();
  }, [changeInFollow]);

  return (
    <>
      {follower && following && (
        <>
          <p className={`${styles.text}`}>
            Abonnés : <span>{`${follower.length}`}</span>
          </p>
          <p className={`${styles.text}`}>
            Abonnement : <span>{`${following.length}`}</span>
          </p>
          {id.id !== userId ? (
            <BtnFollow
              follower={follower}
              id={id.id}
              changeInFollow={changeInFollow}
              setChangeInFollow={setChangeInFollow}
            />
          ) : null}
        </>
      )}
    </>
  );
}
