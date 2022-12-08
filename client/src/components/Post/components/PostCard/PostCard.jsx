import React from "react";

export default function PostCard({ data }) {
  return (
    <div>
      <p>
        {data.post_content}
        <img src={data.post_picture}></img>
      </p>
    </div>
  );
}
