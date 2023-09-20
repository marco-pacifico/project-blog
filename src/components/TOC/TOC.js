import React from "react";

function TOC({ headings }) {
  return (
    <ul>
      {headings.map((heading) => {
      
        const color = heading.isOnScreen ? "red" : "initial";

        return (
          <li key={heading.text} style={{ color }} >
            <a href={`#${heading.id}`}>{heading.text} </a>
          </li>
        );
      })}
    </ul>
  );
}

export default TOC;
