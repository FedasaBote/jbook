import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
// import Resizable from "./components/resizable";
// import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

const App = () => {
  return (
    <div>
      {/* <Resizable direction="vertical">
        <CodeCell />
      </Resizable> */}
      <TextEditor></TextEditor>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
