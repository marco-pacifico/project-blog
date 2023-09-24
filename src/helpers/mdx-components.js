import CodeSnippet from "../components/CodeSnippet";
import DivisionGroupsDemo from "../components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import { H2, H3 } from "@/components/Heading";

const MDXComponents = {
  h2: H2,
  h3: H3,
  pre: CodeSnippet,
  DivisionGroupsDemo,
  CircularColorsDemo,
};

export default MDXComponents;

