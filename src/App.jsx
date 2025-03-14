import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./App.css";

function App() {
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  });

  async function reveiwCode() {
    const response = await axios.post("http://localhost:8080/ai/get-review", {
      code,
    });

    setReview(response.data);
  }

  return (
    <>
      <div className="main">
        <div className="main-heading">
          <h2>CodRev.AI</h2>
        </div>

        <div className="code-section">
          <div className="left-section">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #7777",
                padding: "0.5rem",
                height: "100%",
                width: "100%",
              }}
            />

            <div onClick={reveiwCode} className="review">
              <i className="ri-code-line"></i> Review
            </div>
          </div>
          <div className="right-section">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
