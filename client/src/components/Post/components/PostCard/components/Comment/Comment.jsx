import React, { useState } from "react";
import FormComment from "./components/FormComment/FormComment";
import CommentCard from "./components/CommentCard/CommentCard";
import { useEffect } from "react";

export default function Comment({
  postId,
  dataComment,
  userCo,
  setUpdateComment,
  updateComment,
}) {
  return (
    <>
      <FormComment
        postId={postId}
        setUpdateComment={setUpdateComment}
        updateComment={updateComment}
      />
      {dataComment &&
        dataComment.map((c) => (
          <CommentCard
            key={c.id_comment}
            postid={postId}
            dataComment={c}
            userCo={userCo}
            setUpdateComment={setUpdateComment}
            updateComment={updateComment}
          />
        ))}
    </>
  );
}
