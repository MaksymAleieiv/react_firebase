import React from "react";
import { ChannelsContext } from "../contexts/ChannelsContext";
import { PostContext } from "../contexts/PostsContext";
import CreatePostForm from "./CreatePostForm";
import CreateReplyForm from "./CreateReplyForm";
import { RepliesContext } from "../contexts/RepliesContext";
import { AuthContext } from "../contexts/AuthContext";

function ChannelComponent() {
  const {
    posts,
    fetchAllPostsInChannel,
    unsubscribe,
    selectedPost,
    setSelectedPost,
    setPosts
  } = React.useContext(PostContext);
  const { setReplies } = React.useContext(RepliesContext);

  const { selectedChannel } = React.useContext(ChannelsContext);
  const { user } = React.useContext(AuthContext);

  const [showFeed, setShowFeed] = React.useState(true);

  React.useEffect(() => {
    if (selectedChannel) {
      if (typeof unsubscribe.current === "function") unsubscribe.current();
      fetchAllPostsInChannel(selectedChannel.id);
      setShowFeed(true);
      setSelectedPost(null)
      setPosts([]);
      setReplies([]);
    }
  }, [selectedChannel, user]);

  if (!selectedChannel)
    return <div className="fs-6em">Please, select a channel</div>;

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
        <div className="feed">
          {posts && posts.length === 0 && (
            <div className="fs-2_5em">
              This channel doesn't have any posts. Be first to post something!
            </div>
          )}
          <ul className="postsFeed">
            {posts &&
              posts.map((post) => (
                <li
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="post"
                >
                  <h4>
                    {post.subject}: <span>{post.userName}</span>
                  </h4>
                  <h6>{post.body}</h6>
                </li>
              ))}
          </ul>
          <button className="AddNewPostBtn" onClick={() => setShowFeed(false)}>
            Add New Post
          </button>
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
