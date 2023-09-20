import React from "react";

function TOC({ headings }) {
  return (
      <ul>
        {headings.map((heading) => (
          <li key={heading.text}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
  );
}

export default TOC;
