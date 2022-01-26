import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default class FirebaseService {
  static async addCurrentUserToDB(firestore, userData) {
    try {
      await addDoc(collection(firestore, "users"), userData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  static async addNewChannelToDB(firestore, channelData) {
    try {
      await addDoc(collection(firestore, "channels"), channelData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  static async addNewPostToDB(firestore, postData) {
    try {
      await addDoc(collection(firestore, "posts"), postData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  static async addNewReplyToDB(firestore, replyData) {
    try {
      await addDoc(collection(firestore, "replies"), replyData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  static subscribeToChannels(firestore, provider, setChannels) {
    try {
      const queries = query(
        collection(firestore, "channels"),
        where("provider", "==", provider)
      );
      let unsubscribe = onSnapshot(queries, (docs) => {
        let channels = [];
        docs.forEach((doc) => {
          channels.push(doc.data());
        });
        setChannels(channels);
      });
      return unsubscribe;
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  }

  static async subscribeToPostsInChannel(firestore, channelId, setPosts) {
    try {
      const queries = query(
        collection(firestore, "posts"),
        where("channelId", "==", channelId)
      );
      let unsubscribe = await onSnapshot(queries, (docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push(doc.data());
        });
        setPosts(posts);
      });
      return unsubscribe;
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  }

  static async subscribeToReplies(firestore, postId, setReplies) {
    try {
      const queries = query(
        collection(firestore, "replies"),
        where("postId", "==", postId)
      );
      let unsubscribe = await onSnapshot(queries, (docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push(doc.data());
        });
        setReplies(posts);
      });
      return unsubscribe;
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  }
}
