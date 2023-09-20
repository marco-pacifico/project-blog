import CodeSnippet from "../components/CodeSnippet";
import DivisionGroupsDemo from "../components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";

const MDXComponents = {
  h2: H2,
  h3: H3,
  pre: CodeSnippet,
  DivisionGroupsDemo,
  CircularColorsDemo,
};

export default MDXComponents;

function H2({ children }) {
  const id = children.toLowerCase().replace(/\s/g, "-");
  return <h2 id={id} style={{scrollMargin: "24px 0 0 0"}}>{children}</h2>;
}
function H3({ children }) {
  const id = children.toLowerCase().replace(/\s/g, "-");
  return <h3 id={id} style={{scrollMargin: "24px 0 0 0"}}>{children}</h3>;
}
