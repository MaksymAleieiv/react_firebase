import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { RepliesContext } from "../contexts/RepliesContext";
import AddNewSomething from "./AddNewSomething";

function CreateReplyForm({ selectedPost, setSelectedPost }) {
  const {
    replies,
    setReplies,
    addReplyToPost,
    fetchAllRepliesToPost,
    unsubscribe,
  } = React.useContext(RepliesContext);
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (typeof unsubscribe.current === "function") unsubscribe.current();
    fetchAllRepliesToPost(selectedPost.id);
  }, [selectedPost]);

  return (
    <div>
      <button
        onClick={() => {
          setSelectedPost(null);
          setReplies([]);
        }}
      >
        Go Back
      </button>
      <h3>{selectedPost.subject}</h3>
      {selectedPost.userName} : {selectedPost.body}
      {replies &&
        replies.map((reply) => (
          <div>
            {reply.userName} : {reply.body}
          </div>
        ))}
      <AddNewSomething
        func={addReplyToPost}
        otherFuncOptions={[selectedPost.id, user.name]}
        btnText={"Add Reply"}
      />
    </div>
  );
}

export default CreateReplyForm;
