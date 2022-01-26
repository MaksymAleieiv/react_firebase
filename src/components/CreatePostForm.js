import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PostContext } from "../contexts/PostsContext";

function CreatePostForm({ setShowFeed, channelId }) {
  const { addPostInChannel } = React.useContext(PostContext);
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const { user } = React.useContext(AuthContext);
  return (
    <div>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder={"Subject"}
      ></input>
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={"Body"}
      ></input>
      <button
        onClick={() => {
          addPostInChannel(channelId, subject, body, user.name);
          setShowFeed(true);
        }}
      >
        Post
      </button>
    </div>
  );
}

export default CreatePostForm;
