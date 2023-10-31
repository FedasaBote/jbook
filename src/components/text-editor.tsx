import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useRef } from "react";
import "./text-editor.css";

const TextEditor: React.FC = () => {
  const [value, setValue] = React.useState<string>("**Hello world!!!**");
  const [editing, setEditing] = React.useState<boolean>(false); // [value, setValue
  const ref = useRef<HTMLDivElement | null>(null);
  const handleEditorChange: (value?: string | undefined) => void = (
    newValue
  ) => {
    if (newValue !== undefined) {
      setValue(newValue);
    }
  };
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        console.log("reached here");
        return;
      }
      console.log("reached here 2");
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className="text-editor card">
        <div className="card-content">
          <MDEditor value={value} onChange={handleEditorChange} />
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor">
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
};

export default TextEditor;
