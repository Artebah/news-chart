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
    setPosts(getPosts(resources));
  }, [resources]);

  return (
    <div className="info-bar">
      <h2 className="info-bar-title">Джерела, з яких взято інформацію:</h2>
      {posts.length && (
        <ul className="info-bar-posts">
          {posts.map((post, i) => (
            <li key={post.messageID + "" + i}>
              <span className="info-bar-post-top">
                <span>{i + 1}.</span>
                <p>{post.text}</p>
              </span>
              <a href={post.channel}>{post.channel}</a>
            </li>
          ))}
          <li></li>
        </ul>
      )}
    </div>
  );
};

export { InfoBar };
