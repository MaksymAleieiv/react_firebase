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
        className="goBackBtn"
        onClick={() => {
          setSelectedPost(null);
          setReplies([]);
        }}
      >
        Go Back
      </button>
      <h3 className="fs-3_5em">{selectedPost.subject}</h3>
      <div className="pb">
        {selectedPost.body}: <span>{selectedPost.userName}</span>
      </div>
      <ul className="postsFeed">
        {replies &&
          replies.map((reply) => (
            <li>
              {reply.userName} : {reply.body}
            </li>
          ))}
      </ul>
      <AddNewSomething
        func={addReplyToPost}
        otherFuncOptions={[selectedPost.id, user.name]}
        placeholder={"Your reply..."}
        btnText={"Add Reply"}
        className={"addNewReply"}
      />
    </div>
  );
}

export default CreateReplyForm;
