import React from "react";
import { ChannelsContext } from "../contexts/ChannelsContext";
import { PostContext } from "../contexts/PostsContext";
import CreatePostForm from "./CreatePostForm";
import CreateReplyForm from "./CreateReplyForm";

function ChannelComponent() {
  const { posts, setPosts, fetchAllPostsInChannel, unsubscribe } =
    React.useContext(PostContext);

  const { selectedChannel } = React.useContext(ChannelsContext);

  const [selectedPost, setSelectedPost] = React.useState(null);

  const [showFeed, setShowFeed] = React.useState(true);

  React.useEffect(() => {
    if (selectedChannel) {
      if (typeof unsubscribe.current === "function") unsubscribe.current();
      fetchAllPostsInChannel(selectedChannel.id);
    }
  }, [selectedChannel]);

  if (!selectedChannel) return <>Select a channel</>;

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
        <CreatePostForm
          setShowFeed={setShowFeed}
          channelId={selectedChannel.id}
        />
      )}
    </div>
  );
}

export default ChannelComponent;
