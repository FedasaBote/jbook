import { useState, useEffect, ForwardedRef } from "react";

import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import bundle from "../bundler/";
import React from "react";
import Resizable from "./resizable";
const CodeCell: React.FC = React.forwardRef(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const [input, setInput] = useState("");
    const [err, setErr] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
      const timer = setTimeout(async () => {
        const output = await bundle(input);
        setCode(output.code);
        setErr(output.err);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }, [input]);

    return (
      //  <Resizable direction="vertical">
      <div
        ref={ref}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <div ref={ref} className={`editor-wrapper `}>
            <CodeEditor
              initialValue="const a=1"
              onChange={(value: string) => setInput(value)}
            />
          </div>
        </Resizable>
        <Preview code={code} err={err} />
      </div>
      // </Resizable>
    );
  }
);

export default CodeCell;
