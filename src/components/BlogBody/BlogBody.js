"use client";
import React from "react";
import TOC from "@/components/TOC";
import styles from "./blogBody.module.css";

function BlogBody({ headings, children }) {
  return (
    <div className={styles.page}>
      <aside className={styles.toc}>
        <TOC headings={headings} />
      </aside>
      {children}
    </div>
  );
}

export default BlogBody;
