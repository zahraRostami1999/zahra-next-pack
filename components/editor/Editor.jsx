import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

const Editor = ({ defaultValue = "" }, ref) => {
  const [value, setValue] = useState(defaultValue);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (v) => setValue(v),
  }));

  return (
    <ReactQuill
      value={value}
      onChange={setValue}
      placeholder="نظر و شواهد ارزیابی خود را شرح دهید..."
      modules={modules}
      formats={formats}
      theme="snow"
      style={{
        width: "1188px",
        height: "279px",
        overflow: "hidden", 
      }}
    />
  );
};

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "bullet",
  "align",
  "blockquote",
  "code-block",
  "link",
];

export default forwardRef(Editor);
