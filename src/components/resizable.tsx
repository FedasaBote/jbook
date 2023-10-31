import { ResizableBox, ResizableBoxProps } from "react-resizable";
import React, { useEffect } from "react";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth * 0.75);
  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);
  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      className: `resize-horizontal`,
      width: innerWidth,
      height: Infinity,
      resizeHandles: ["e"],
      maxConstraints: [width * 0.75, Infinity],
      minConstraints: [width * 0.2, Infinity],
      onResize: (event, data) => {
        setTimeout(() => {
          setInnerWidth(data.size.width);
        }, 100);
      },
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, height * 0.9],
      minConstraints: [Infinity, 24],
    };
  }

  return <ResizableBox {...resizableProps} handle={children}></ResizableBox>;
};

export default Resizable;
