export * from './CodeSnippet';
import dynamic from 'next/dynamic';
const CodeSnippet = dynamic(() => import('./CodeSnippet'));
export default CodeSnippet;
