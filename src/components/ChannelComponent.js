import React from "react";
import { PostContext } from "../contexts/PostsContext";
import CreatePostForm from "./CreatePostForm";
import CreateReplyForm from "./CreateReplyForm";

function ChannelComponent({ channel }) {
  const { posts, fetchAllPostsInChannel, unsubscribe } =
    React.useContext(PostContext);

  React.useEffect(() => {
    if (typeof unsubscribe.current === "function") unsubscribe.current();
    fetchAllPostsInChannel(channel.id);
  }, [channel]);

  const [selectedPost, setSelectedPost] = React.useState(null);

  const [showFeed, setShowFeed] = React.useState(true);

  if (selectedPost)
    return (
      <CreateReplyForm
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    );

  return (
    <div>
      {showFeed ? (
        <div>
          <button onClick={() => setShowFeed(false)}>Add New Post</button>
          {posts &&
            posts.map((post) => (
              <div key={post.id} onClick={() => setSelectedPost(post)}>
                <h4>
                  {post.userName} : {post.subject}
                </h4>
                <h6>{post.body}</h6>
              </div>
            ))}
        </div>
      ) : (
        <CreatePostForm setShowFeed={setShowFeed} channelId={channel.id} />
      )}
    </div>
  );
}

export default ChannelComponent;
