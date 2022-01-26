import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { RepliesContext } from "../contexts/RepliesContext";

function CreateReplyForm({ selectedPost, setSelectedPost }) {
  const { replies, addReplyToPost, fetchAllRepliesToPost, unsubscribe } =
    React.useContext(RepliesContext);
  const { user } = React.useContext(AuthContext);

  const [subject, setSubject] = React.useState("");

  React.useEffect(() => {
    if (typeof unsubscribe.current === "function") unsubscribe.current();
    fetchAllRepliesToPost(selectedPost.id);
  }, [selectedPost]);

  return (
    <div>
      <button onClick={() => setSelectedPost(null)}>Go Back</button>
      <h3>{selectedPost.subject}</h3>
      {selectedPost.userName} : {selectedPost.body}
      {replies &&
        replies.map((reply) => (
          <div>
            {reply.userName} : {reply.body}
          </div>
        ))}
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      ></input>
      <button
        onClick={() => addReplyToPost(selectedPost.id, subject, user.name)}
      >
        Add Reply
      </button>
    </div>
  );
}

export default CreateReplyForm;
