import React from "react";
import { getPosts } from "../helpers/getPosts";
import { Post } from "../types/Post";
import { Resource } from "../types/Resourse";

interface InfoBarProps {
  resources: Resource[];
}

const InfoBar: React.FC<InfoBarProps> = ({ resources }) => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const newPosts = getPosts(resources);

    setPosts(newPosts);
  }, [resources]);

  return (
    <div className="info-bar">
      <h2 className="info-bar-title">Джерела, з яких взято інформацію:</h2>
      {posts.length && (
        <ul className="info-bar-posts">
          {posts.map((post, i) => (
            <li key={post.messageID + "" + i}>
              <span className="info-bar-post-top">
                {i + 1}. {post.text}
              </span>
              <p>{post.pub_date}</p>
              <a href={post.channel}>{post.channel}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { InfoBar };
