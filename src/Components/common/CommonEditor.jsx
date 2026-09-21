import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const editorModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image"],
  ],
};

const CommonEditor = ({
  label,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label
        style={{
          fontStyle: "normal",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "8px",
          display: "block",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "red" }}> *</span>
        )}
      </label>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder="Enter"
        modules={editorModules}
        style={{
          height: "150px",
          marginBottom: "50px",
        }}
      />
    </div>
  );
};

export default CommonEditor;