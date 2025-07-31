import React from "react";

interface Props {
    tags: string;
} 

const BlogTags = ({tags}: Props) => {
  return (
    <div>
      <ul className="list-group list-group-horizontal list-unstyled mb-2">
        {tags.split(" ").map((tag) => (
          <li key={tag} className="badge bg-primary me-1 mx-2">
            <span className="text-info">#</span>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogTags;
